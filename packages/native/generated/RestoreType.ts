import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum RestoreTypeEnum {
  Sender,
  Scander,
  AllSystem,
  None,
}
/**
 * Codec for {@link RestoreTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:74517
 */
export const RestoreType = EnumFromString(RestoreTypeEnum, 'RestoreType');
