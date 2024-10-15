import { ExtractType, Struct } from 'typed-struct';

export const RegionInfo = new Struct('RegionInfo')
  .UInt8('SenderIndex')
  .UInt8('PortIndex')
  .UInt16LE('ConnectIndex')
  .UInt16LE('X')
  .UInt16LE('Y')
  .UInt16LE('XInPort')
  .UInt16LE('YInPort')
  .UInt16LE('Width')
  .UInt16LE('Height')
  .UInt8('DVIIndex')
  .compile();

export type RegionInfo = ExtractType<typeof RegionInfo, false>;
