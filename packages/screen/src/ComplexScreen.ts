import { ComplexLEDDisplayInfo } from '@novastar/native/ComplexLEDDisplayInfo';
import { LEDDisplyTypeEnum } from '@novastar/native/LEDDisplyType';
import { VirtualModeTypeEnum } from '@novastar/native/VirtualModeType';
import { isLeft } from 'fp-ts/Either';
import { PathReporter } from 'io-ts/PathReporter';
import { ExtractType, Struct, typed } from 'typed-struct';

import { ComplexRegionInfo } from './ComplexRegionInfo';

export const ComplexScreen = new Struct('ComplexScreen')
  .UInt8('Type', LEDDisplyTypeEnum.ComplexType)
  .UInt8('VirtualMode', typed<VirtualModeTypeEnum>())
  .UInt32LE('ScannerCount')
  .StructArray('ScanBoardRegionInfoList', ComplexRegionInfo)
  .compile();

export type ComplexScreen = ExtractType<typeof ComplexScreen, false>;

export const decodeComplexLEDDisplayInfo = (data: Buffer): ComplexLEDDisplayInfo => {
  const screen = new ComplexScreen(data).toJSON();
  const validation = ComplexLEDDisplayInfo.decode(screen);
  if (isLeft(validation))
    throw new TypeError(`Invalid complex screen: ${PathReporter.report(validation)}`);
  return validation.right;
};
