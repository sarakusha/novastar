import { ExtractType, Struct, typed } from 'typed-struct';

export const TAURUS_PACKET_FLAG = 0x4e4f5641;
export const TAURUS_REQUEST = 0x5251;
export const TAURUS_RESPONSE = 0x5250;
export const TAURUS_DISCOVERY = 0x8855;

/**
 * Taurus request argument.
 *
 * Wire layout:
 *   action   UInt8
 *   type     UInt8
 *   reserved UInt16LE
 */
const TaurusRequest = new Struct('TaurusRequest')
  .UInt8('action')
  .UInt8('type')
  .seek(2) // reserved
  .compile();

export interface TaurusRequest extends ExtractType<typeof TaurusRequest, false> {}

/**
 * Taurus response argument.
 *
 * Wire layout:
 *   status UInt16LE
 *   action UInt8
 *   type   UInt8
 */
const TaurusResponse = new Struct('TaurusResponse')
  .UInt16LE('status')
  .UInt8('action')
  .UInt8('type')
  .compile();

export interface TaurusResponse extends ExtractType<typeof TaurusResponse, false> {}

/**
 * Taurus packet.
 *
 * The same 4 bytes are exposed as both request and response structures.
 * packetType determines which representation should be used.
 */
export const TaurusPacket = new Struct('TaurusPacket')
  .UInt32LE('flag', TAURUS_PACKET_FLAG)
  .UInt32LE('sequence')
  .UInt16LE(
    'packetType',
    typed<typeof TAURUS_REQUEST | typeof TAURUS_RESPONSE | typeof TAURUS_DISCOVERY>(),
  )
  .UInt16LE('what')

  // Union: request/response occupy the same four bytes.
  .Struct('req', TaurusRequest)
  .back()
  .Struct('res', TaurusResponse)
  .UInt32LE('length')
  .UInt8('encodeType')
  .seek(1)
  .UInt16LE('checksum')
  .Buffer('body')
  .compile();

export interface TaurusPacket extends ExtractType<typeof TaurusPacket, false> {}

export interface TaurusCommand {
  what: number;
  type: number;
  action: number;
}

export const TAURUS_HEADER_SIZE = TaurusPacket.baseSize;

const FLAG_OFFSET = TaurusPacket.getOffsetOf('flag');
const LENGTH_OFFSET = TaurusPacket.getOffsetOf('length');
const CHECKSUM_OFFSET = TaurusPacket.getOffsetOf('checksum');

const signedByte = (value: number): number => (value > 0x7f ? value - 0x100 : value);

/**
 * Calculates Taurus header checksum.
 *
 * The checksum is the sum of all signed 8-bit values preceding
 * the checksum field.
 */
export const calculateTaurusHeaderChecksum = (header: Uint8Array): number => {
  if (header.length < CHECKSUM_OFFSET) {
    throw new RangeError('Taurus header is too short');
  }

  let checksum = 0;

  for (let index = 0; index < CHECKSUM_OFFSET; index += 1) {
    checksum += signedByte(header[index]);
  }

  return checksum & 0xffff;
};

/**
 * Returns the full packet size once the complete header is available.
 */
export const getTaurusPacketSize = (buffer: Uint8Array): number | undefined => {
  if (buffer.length < TAURUS_HEADER_SIZE) {
    return undefined;
  }

  const view = Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength);

  if (view.readUInt32LE(FLAG_OFFSET) !== TAURUS_PACKET_FLAG) {
    throw new Error('Invalid Taurus packet flag');
  }

  return TAURUS_HEADER_SIZE + view.readUInt32LE(LENGTH_OFFSET);
};

/**
 * Encodes a Taurus request.
 */
export const encodeTaurusRequest = (
  sequence: number,
  { what, type, action }: TaurusCommand,
  body: string | Buffer = Buffer.alloc(0),
  encodeType = 0,
): Buffer => {
  const payload = typeof body === 'string' ? Buffer.from(body, 'utf8') : body;

  const packet = new TaurusPacket(TAURUS_HEADER_SIZE + payload.length);

  packet.sequence = sequence;
  packet.packetType = TAURUS_REQUEST;
  packet.what = what;

  packet.req.action = action;
  packet.req.type = type;

  packet.length = payload.length;
  packet.encodeType = encodeType;

  payload.copy(packet.body);

  const raw = TaurusPacket.raw(packet);

  packet.checksum = calculateTaurusHeaderChecksum(raw);

  return raw;
};

/** Encodes the UDP search request used by Taurus players on port 16601. */
export const encodeTaurusDiscoveryRequest = (supportsEncryption = true): Buffer => {
  const packet = new TaurusPacket(TAURUS_HEADER_SIZE);
  packet.sequence = 0xffffffff;
  packet.packetType = TAURUS_DISCOVERY;
  packet.what = 0x81;
  packet.req.action = supportsEncryption ? 1 : 0;
  packet.req.type = 0;
  packet.length = 0;
  packet.checksum = calculateTaurusHeaderChecksum(TaurusPacket.raw(packet));
  return TaurusPacket.raw(packet);
};

/**
 * Decodes and validates a Taurus packet.
 */
export const decodeTaurusPacket = (buffer: Uint8Array): TaurusPacket => {
  const view = Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength);

  const packetSize = getTaurusPacketSize(view);

  if (packetSize === undefined || view.length < packetSize) {
    throw new Error('Incomplete Taurus packet');
  }

  const expectedChecksum = view.readUInt16LE(CHECKSUM_OFFSET);
  const actualChecksum = calculateTaurusHeaderChecksum(view);

  if (actualChecksum !== expectedChecksum) {
    throw new Error(
      `Invalid Taurus header checksum: expected 0x${expectedChecksum.toString(16)}, ` +
        `calculated 0x${actualChecksum.toString(16)}`,
    );
  }

  return new TaurusPacket(view.subarray(0, packetSize));
};
