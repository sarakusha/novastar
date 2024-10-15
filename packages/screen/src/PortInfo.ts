import { ScanBoardConnectTypeEnum } from '@novastar/native/ScanBoardConnectType';
import { ExtractType, Struct, typed } from 'typed-struct';

export const PortInfo = new Struct('PortInfo')
  .UInt8('ConnectType', typed<ScanBoardConnectTypeEnum>())
  .UInt8('PortIndex')
  .UInt16LE('ScanBdBegColNo')
  .UInt16LE('ScanBdBegRowNo')
  .UInt16LE('ScanBdEndColNo')
  .UInt16LE('ScanBdEndRowNo')
  .compile();

export type PortInfo = ExtractType<typeof PortInfo, false>;
