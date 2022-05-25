import { LEDDisplyTypeEnum } from '@novastar/native/LEDDisplyType';
import { StandardLEDDisplayInfo } from '@novastar/native/StandardLEDDisplayInfo';
import { VirtualModeTypeEnum } from '@novastar/native/VirtualModeType';
import debugFactory from 'debug';
import { isLeft } from 'fp-ts/lib/Either';
import { PathReporter } from 'io-ts/lib/PathReporter';
import Struct, { ExtractType, typed } from 'typed-struct';

import { RegionInfo } from './RegionInfo';

const debug = debugFactory('novastar:standard-screen');
export const StandardScreen = new Struct('StandardScreen')
  .UInt8('Type', LEDDisplyTypeEnum.StandardType)
  .UInt8('VirtualMode', typed<VirtualModeTypeEnum>())
  .UInt16LE('X')
  .UInt16LE('Y')
  .UInt16LE('ScanBdCols')
  .UInt16LE('ScanBdRows')
  .StructArray('ScannerRegionList', RegionInfo)
  .compile();

export type StandardScreen = ExtractType<typeof StandardScreen, false>;

export const decodeStandardLEDDisplayInfo = (data: Buffer): StandardLEDDisplayInfo => {
  const screen = new StandardScreen(data).toJSON();
  debug(`parse: ${JSON.stringify(screen)}`);
  const validation = StandardLEDDisplayInfo.decode(screen);
  if (isLeft(validation))
    throw new TypeError(`Invalid standard screen info: ${PathReporter.report(validation)}`);
  return validation.right;
};
