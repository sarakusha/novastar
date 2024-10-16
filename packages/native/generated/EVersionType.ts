import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum EVersionTypeEnum {
  Sender,
  ScannerMCU,
  ScannerFPGA,
  MoudeMCU,
  SenderFPGA,
  Sender3DFPGA,
  Sender3DMCU,
}
/**
 * Codec for {@link EVersionTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:74257
 */
export const EVersionType = EnumFromString(EVersionTypeEnum, 'EVersionType');
