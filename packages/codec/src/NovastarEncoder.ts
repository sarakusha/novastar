/* eslint-disable no-underscore-dangle */
import { Transform, TransformCallback, TransformOptions } from 'stream';

import debugFactory from 'debug';

import Request from './Request';

const debug = debugFactory('novastar:encoder');

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
        debug(`<<< ${pkg} [${pkg.serno}:${pkg.tag ?? ''}]`);
        this.push(raw);
      }
    });
    callback();
  }
}
