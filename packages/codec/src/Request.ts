import { COMPUTER, IO, isPacket, Packet, REQUEST } from './Packet';

const isLikeNumberArray = (value: unknown): value is ReadonlyArray<number> | Buffer =>
  Buffer.isBuffer(value) ||
  (Array.isArray(value) && (value.length === 0 || typeof value[0] === 'number'));

const createArgs = (
  param: Packet | Buffer | ReadonlyArray<number> | number
): [Buffer, true | undefined] => {
  if (isPacket(param)) return [Packet.raw(param), true];
  const raw = Buffer.alloc(Packet.baseSize + (isLikeNumberArray(param) ? param.length : 0));
  return [raw, undefined];
};

const dataOffset = Packet.getOffsetOf('data');

/**
 * Custom request prepared for sending to Novastar devices
 */
export default class Request<Broadcast extends boolean = false> extends Packet {
  private static counter = 0;

  /**
   * If this is true, then do not wait for a response from the device
   */
  readonly broadcast?: Broadcast;

  /**
   * Overriding the timeout for this request
   */
  timeout?: number;

  /**
   * Overriding the maximum data length for this request
   */
  maxLength?: number;

  /**
   * Preserves the size of the original request if it exceeds 65535.
   */
  readonly originalLength?: number;

  /**
   * For debugging and describing exceptions
   */
  readonly tag?: string;

  /**
   * @internal
   * Copy constructor
   * @param other
   * @param broadcast
   * @param tag
   */
  constructor(other: Packet, broadcast?: Broadcast, tag?: string);

  /**
   * Create a read request
   * @param readLength - requested data length
   * @param tag - description
   */
  constructor(readLength: number, tag?: string);

  /**
   * Create a write request. If `broadcast` is true, then do not wait for a response from the device
   * @param writeData - data to send
   * @param broadcast
   * @param tag description
   */
  constructor(writeData: Buffer | ReadonlyArray<number>, broadcast?: Broadcast, tag?: string);

  constructor(writeData: Buffer | ReadonlyArray<number>, tag: string);

  constructor(
    param: Packet | Buffer | ReadonlyArray<number> | number,
    param2?: Broadcast | string,
    param3?: string
  ) {
    super(...createArgs(param));
    const broadcast = typeof param2 === 'boolean' ? param2 : undefined;
    this.tag = typeof param2 === 'string' ? param2 : param3;
    if (!isPacket(param)) {
      this.head = REQUEST;
      this.source = COMPUTER;
      this.broadcast = broadcast;

      if (isLikeNumberArray(param)) {
        this.io = IO.Write;
        Buffer.from(param).copy(this.data);
        this.length = param.length;
        this.originalLength = param.length;
      } else {
        this.io = IO.Read;
        this.length = param;
        this.originalLength = param;
      }
    } else if (param instanceof Request) {
      this.broadcast = param.broadcast;
      this.timeout = param.timeout;
      this.maxLength = param.maxLength;
      this.originalLength = param.originalLength;
      this.tag = param.tag;
    }
    this.serno = Request.next();
  }

  /**
   * Split the original request into chunks with the specified maximum data length
   * @param req - original request
   * @param maxLength - maximum data length
   * @returns - chunks
   */
  static makeChunks<Broadcast extends boolean = false>(
    req: Request<Broadcast>,
    maxLength = 256
  ): Request<Broadcast>[] {
    if (maxLength <= 0) throw new TypeError(`Invalid maxLength: ${maxLength}`);
    const total = req.originalLength ?? req.length; // req.data.length;
    const count = Math.ceil(total / maxLength) || 1;
    if (count === 1) return [req];
    const raw = Packet.raw(req);
    return [...new Array(count)].map((_, i) => {
      const start = i * maxLength;
      const length = Math.min(total - start, maxLength);
      const bufSize = Packet.baseSize + (req.io === IO.Write ? length : 0);
      const buffer = Buffer.alloc(bufSize);
      raw.copy(buffer, 0, 0, dataOffset);
      if (req.io === IO.Write) {
        req.data.copy(buffer, dataOffset, start, start + length);
      }
      const chunk = new Request(
        new Packet(buffer),
        req.broadcast,
        req.tag && `${req.tag}:${i}`
      ) as Request<Broadcast>;
      chunk.timeout = req.timeout;
      chunk.maxLength = maxLength;
      chunk.address += start;
      chunk.length = length;
      return chunk;
    });
  }

  private static next(): number {
    Request.counter = (Request.counter + 1) % 256;
    return Request.counter;
  }
}

export const isNotBroadcast = (req: Request<boolean>): req is Request => !req.broadcast;
