/* eslint-disable no-underscore-dangle */
import { Transform, TransformCallback, TransformOptions } from 'stream';

import debugFactory from 'debug';

import Request from './Request';
import { printBuffer } from './helper';

const debug = debugFactory('codec:encoder');

export default class NovastarEncoder extends Transform {
  constructor(options?: TransformOptions) {
    super({
      ...options,
      writableObjectMode: true,
    });
  }

  public _transform(chunk: unknown, encoding: BufferEncoding, callback: TransformCallback): void {
    const chunks = Array.isArray(chunk) ? chunk : [chunk];
    chunks.forEach(pkg => {
      if (pkg instanceof Request) {
        Request.crc(pkg, true);
        const raw = Request.raw(pkg);
        debug(`<<< ${printBuffer(raw)}`);
        this.push(raw);
      }
    });
    callback();
  }
}
