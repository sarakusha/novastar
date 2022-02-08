import Struct, { ExtractType } from 'typed-struct';

export const ComplexRegionInfo = new Struct('ComplexRegionInfo')
  .UInt8('SenderIndex')
  .UInt8('PortIndex')
  .UInt16LE('ConnectIndex')
  .UInt16LE('X')
  .UInt16LE('Y')
  .UInt16LE('XInPort')
  .UInt16LE('YInPort')
  .UInt16LE('Width')
  .UInt16LE('Height')
  .compile();

export type ComplexRegionInfo = ExtractType<typeof ComplexRegionInfo, false>;
