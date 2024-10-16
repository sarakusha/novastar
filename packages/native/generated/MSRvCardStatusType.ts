import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum MSRvCardStatusTypeEnum {
  CardOk,
  MasterOK,
  SideOK,
  CardError,
  UnConnect,
  UnKnown,
}
/**
 * Codec for {@link MSRvCardStatusTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:76000
 */
export const MSRvCardStatusType = EnumFromString(MSRvCardStatusTypeEnum, 'MSRvCardStatusType');
