/* eslint-disable no-underscore-dangle,no-bitwise */
import { Transform, TransformCallback, TransformOptions } from 'stream';

import debugFactory from 'debug';

import { COMPUTER, Packet, RESPONSE } from './Packet';

const debug = debugFactory('novastar:decoder');

const empty = Buffer.alloc(0);

const preamble = Buffer.from([RESPONSE % 256, RESPONSE >>> 8]);

const lengthOffset = Packet.getOffsetOf('length');

export default class NovastarDecoder extends Transform {
  private buf: Buffer = empty;

  private last: Packet[] = [];

  constructor(options?: TransformOptions) {
    super({
      ...options,
      readableObjectMode: true,
    });
  }

  public _transform(chunk: unknown, encoding: BufferEncoding, callback: TransformCallback) {
    if (Buffer.isBuffer(chunk)) {
      const data = Buffer.concat([this.buf, chunk]);
      if (data.length >= preamble.length) {
        this.buf = this.recognize(data);
      }

      this.last.length > 0 && debug(`>>> ${this.last.join(', ')} [${this.last.map(pkg => pkg.serno)
        .join(', ')}]`);
      this.last.length = 0;
    }
    callback();
  }

  _flush(callback: TransformCallback) {
    this.buf = empty;
    callback();
  }

  private recognize(data: Buffer): Buffer {
    for (let offset = 0; ;) {
      const rest = data.length - offset;
      if (rest <= 0) return empty;
      const start = data.indexOf(
        rest < preamble.length ? preamble.slice(0, rest) : preamble,
        offset,
      );
      if (start === -1) return empty;
      const frame = data.slice(start);
      if (frame.length < Packet.baseSize) return frame;
      const length = frame.readUInt16LE(lengthOffset);
      const total = length + Packet.baseSize;
      if (frame.length < total) return frame;
      const pkg = new Packet(frame.slice(0, total));
      if (Packet.crc(pkg) === pkg.crc) {
        if (pkg.destination === COMPUTER) {
          this.push(pkg);
          this.last.push(pkg);
        }
        offset = start + total;
      }
      if (offset <= start) {
        offset = start + 1;
      }
    }
  }
}
