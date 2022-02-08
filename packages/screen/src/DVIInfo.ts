import { GraphicsDVIPortInfo } from '@novastar/native/build/main/generated/GraphicsDVIPortInfo';
import { isLeft } from 'fp-ts/lib/Either';
import { PathReporter } from 'io-ts/lib/PathReporter';
import Struct, { ExtractType } from 'typed-struct';

import { crc } from './common';

export const DVIInfo = new Struct('DVIInfo')
  .UInt16LE('version')
  .UInt16LE('crc')
  .UInt8('DviPortCols')
  .UInt8('DviPortRows')
  .UInt8('GraphicsWidth')
  .UInt8('GraphicsHeight')
  .compile();

export type DVIInfo = ExtractType<typeof DVIInfo, false>;

export const decodeGraphicsDVIPortInfo = (data: Buffer): [GraphicsDVIPortInfo, number] => {
  const info = new DVIInfo(data);
  if (info.crc !== crc(data.slice(4), 0)) throw new TypeError('Invalid dvi info crc');
  const validation = GraphicsDVIPortInfo.decode(info.toJSON());
  if (isLeft(validation))
    throw new TypeError(`Invalid dvi info: ${PathReporter.report(validation)}`);
  return [validation.right, info.version];
};
