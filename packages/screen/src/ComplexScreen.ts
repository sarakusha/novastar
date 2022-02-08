import { ComplexLEDDisplayInfo } from '@novastar/native/build/main/generated/ComplexLEDDisplayInfo';
import { LEDDisplyTypeEnum } from '@novastar/native/build/main/generated/LEDDisplyType';
import { VirtualModeTypeEnum } from '@novastar/native/build/main/generated/VirtualModeType';
import { isLeft } from 'fp-ts/lib/Either';
import { PathReporter } from 'io-ts/lib/PathReporter';
import Struct, { ExtractType, typed } from 'typed-struct';

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
