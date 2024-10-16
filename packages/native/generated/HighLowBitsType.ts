import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum HighLowBitsTypeEnum {
  Horizontal_LeftHigh,
  Horizontal_RightHigh,
  Vertical_UpHigh,
  Vertical_DownHigh,
}
/**
 * Codec for {@link HighLowBitsTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:73673
 */
export const HighLowBitsType = EnumFromString(HighLowBitsTypeEnum, 'HighLowBitsType');
