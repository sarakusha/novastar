import { LEDDisplyTypeEnum } from '@novastar/native/LEDDisplyType';
import { SimpleLEDDisplayInfo } from '@novastar/native/SimpleLEDDisplayInfo';
import { VirtualModeTypeEnum } from '@novastar/native/VirtualModeType';
import debugFactory from 'debug';
import { isLeft } from 'fp-ts/Either';
import { PathReporter } from 'io-ts/PathReporter';
import { ExtractType, Struct, typed } from 'typed-struct';

import { PortInfo } from './PortInfo';

const debug = debugFactory('novastar:simple-screen');

export const SimpleSingleScreen = new Struct('SimpleSingleScreen')
  .UInt8('Type', LEDDisplyTypeEnum.SimpleSingleType)
  .UInt8('VirtualModeType', typed<VirtualModeTypeEnum>())
  .UInt16LE('X')
  .UInt16LE('Y')
  .UInt8('SenderIndex')
  .UInt8('PortCols')
  .UInt8('PortRows')
  .UInt16LE('ScanBdCols')
  .UInt16LE('ScanBdRows')
  .UInt16LE('PixelColsInScanBd')
  .UInt16LE('PixelRowsInScanBd')
  .StructArray('PortScanBdInfoList', PortInfo)
  .compile();

// export type ExtractType<C> = C extends new () => infer T ? T : never;

export type SimpleSingleScreen = ExtractType<typeof SimpleSingleScreen, false>;

export const decodeSimpleLEDDisplayInfo = (data: Buffer): SimpleLEDDisplayInfo => {
  const screen = new SimpleSingleScreen(data).toJSON();
  debug(`parse: ${JSON.stringify(screen)}`);
  const validation = SimpleLEDDisplayInfo.decode(screen);
  if (isLeft(validation))
    throw new TypeError(`Invalid simple display info: ${PathReporter.report(validation)}`);
  return validation.right;
};
