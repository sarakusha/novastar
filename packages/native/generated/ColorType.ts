import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum ColorTypeEnum {
  Red,
  Green,
  Blue,
  VRed,
}
/**
 * Codec for {@link ColorTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSCL8080.decompiled.cs:286
 */
export const ColorType = EnumFromString(ColorTypeEnum, 'ColorType');
