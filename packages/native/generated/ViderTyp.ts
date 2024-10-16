import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum ViderTypEnum {
  UpAndDown = 8,
  FramePacking = 24, // 0x18
  None = 25,
}
/**
 * Codec for {@link ViderTypEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:74294
 */
export const ViderTyp = EnumFromString(ViderTypEnum, 'ViderTyp');
