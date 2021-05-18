import { COMPUTER, DeviceType, getCrc, IO, Packet, REQUEST } from './Packet';

const isLikeNumberArray = (value: unknown): value is ReadonlyArray<number> | Buffer =>
  Buffer.isBuffer(value) ||
  (Array.isArray(value) && (value.length === 0 || typeof value[0] === 'number'));

export default class Request extends Packet {
  private static counter = 0;

  private static next(): number {
    Request.counter = (Request.counter + 1) % 256;
    return Request.counter;
  }

  constructor(readLength: number);

  constructor(writeData: Buffer | ReadonlyArray<number>, broadcast?: boolean);

  constructor(dataOrLength: Buffer | ReadonlyArray<number> | number, broadcast = false) {
    super(
      Buffer.alloc(Packet.baseSize + (isLikeNumberArray(dataOrLength) ? dataOrLength.length : 0))
    );
    this.head = REQUEST;
    this.source = COMPUTER;
    this.serno = Request.next();
    if (isLikeNumberArray(dataOrLength)) {
      this.io = IO.Write;
      Buffer.from(dataOrLength).copy(this.data);
      this.length = dataOrLength.length;
      if (broadcast) {
        this.rcvIndex = 0xffff;
        this.deviceType = DeviceType.ReceivingCard;
      }
    } else {
      this.io = IO.Read;
      this.length = dataOrLength;
    }
  }
  //
  // get raw(): Buffer {
  //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //   return Struct.raw(this)!;
  // }

  updateCrc(): void {
    this.crc = getCrc(Request.raw(this));
  }
}
