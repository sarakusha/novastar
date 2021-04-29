/* eslint-disable no-underscore-dangle,no-bitwise */
import { Transform, TransformCallback, TransformOptions } from 'stream';

import { COMPUTER, lengthOffset, Package, PACKAGE_SIZE, RESPONSE } from './Package';

const empty = Buffer.alloc(0);

const preamble = Buffer.from([RESPONSE % 256, RESPONSE >>> 8]);

export default class NovastarDecoder extends Transform {
  private buf: Buffer = empty;

  constructor(options?: TransformOptions) {
    super({
      ...options,
      readableObjectMode: true,
    });
  }

  public _transform(chunk: unknown, encoding: BufferEncoding, callback: TransformCallback) {
    if (Buffer.isBuffer(chunk)) {
      const data = Buffer.concat([this.buf, chunk]);
      if (data.length > 0) {
        this.buf = this.recognize(data);
      }
    }
    callback();
  }

  _flush(callback: TransformCallback) {
    this.buf = empty;
    callback();
  }

  private recognize(data: Buffer): Buffer {
    const start = data.indexOf(preamble);
    if (start === -1) return empty;
    const frame = data.slice(start);
    if (frame.length < lengthOffset + 2) return frame;
    const length = frame.readUInt16LE(lengthOffset);
    const total = length + PACKAGE_SIZE;
    if (frame.length < total) return frame;
    const pkg = new Package(frame.slice(0, total));
    if (pkg.destinationAddress === COMPUTER) this.push(pkg);
    return frame.slice(total);
  }
}
