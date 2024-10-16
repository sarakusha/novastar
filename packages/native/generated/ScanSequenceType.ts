import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum ScanSequenceTypeEnum {
  None,
  Asc,
  Desc,
}
/**
 * Codec for {@link ScanSequenceTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:71928
 */
export const ScanSequenceType = EnumFromString(ScanSequenceTypeEnum, 'ScanSequenceType');
