import {
  calculateTaurusHeaderChecksum,
  decodeTaurusPacket,
  encodeTaurusDiscoveryRequest,
  encodeTaurusRequest,
  getTaurusPacketSize,
  TAURUS_HEADER_SIZE,
  TAURUS_RESPONSE,
  TaurusPacket,
} from './packet';

describe('Taurus packet', () => {
  test('encodes the observed UDP discovery request', () => {
    expect(encodeTaurusDiscoveryRequest().toString('hex')).toBe(
      '41564f4effffffff55888100010000000000000000008f00',
    );
  });

  test('encodes the observed environment brightness request', () => {
    expect(encodeTaurusRequest(1, { what: 0x1a, type: 0, action: 5 }).toString('hex')).toBe(
      '41564f4e0100000051521a0005000000000000000000f701',
    );
  });

  test('decodes a response', () => {
    const body = Buffer.from('{"value":180}');
    const packet = Buffer.alloc(TAURUS_HEADER_SIZE + body.length);
    packet.writeUInt32LE(0x4e4f5641, 0);
    packet.writeUInt32LE(7, 4);
    packet.writeUInt16LE(TAURUS_RESPONSE, 8);
    packet.writeUInt16LE(0x1a, 10);
    packet.writeUInt32LE(5 << 16, 12);
    packet.writeUInt32LE(body.length, 16);
    packet.writeUInt16LE(calculateTaurusHeaderChecksum(packet), 22);
    body.copy(packet, TAURUS_HEADER_SIZE);

    expect(getTaurusPacketSize(packet)).toBe(packet.length);
    const decoded = decodeTaurusPacket(packet);

    expect(decoded).toMatchObject({
      sequence: 7,
      packetType: TAURUS_RESPONSE,
      what: 0x1a,
      encodeType: 0,
      body,
    });

    expect(decoded.res).toMatchObject({
      type: 0,
      action: 5,
      status: 0,
    });
  });

  test('rejects an invalid checksum', () => {
    const packet = encodeTaurusRequest(1, {
      what: 0x1a,
      type: 0,
      action: 5,
    });

    packet[TAURUS_HEADER_SIZE - 2] ^= 0xff;

    expect(() => decodeTaurusPacket(packet)).toThrow('Invalid Taurus header checksum');
  });
});
