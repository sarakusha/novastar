/* eslint-disable no-underscore-dangle */
import { Transform, TransformCallback, TransformOptions } from 'stream';

import Request from './Request';

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
        pkg.updateCrc();
        this.push(Request.raw(pkg));
      }
    });
    callback();
  }
}
