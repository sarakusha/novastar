import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum XlSaveAsAccessModeEnum {
  xlExclusive = 3,
  xlNoChange = 1,
  xlShared = 2,
}
/**
 * Codec for {@link XlSaveAsAccessModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipXM11920G.decompiled.cs:4970
 */
export const XlSaveAsAccessMode = EnumFromString(XlSaveAsAccessModeEnum, 'XlSaveAsAccessMode');
