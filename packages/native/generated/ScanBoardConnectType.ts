import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum ScanBoardConnectTypeEnum {
  LeftTop_Horizontal,
  LeftBottom_Horizontal,
  RightTop_Horizontal,
  RightBottom_Horizontal,
  LeftTop_Vertical,
  LeftBottom_Vertical,
  RightTop_Vertical,
  RightBottom_Vertical,
}
/**
 * Codec for {@link ScanBoardConnectTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:71361
 */
export const ScanBoardConnectType = EnumFromString(
  ScanBoardConnectTypeEnum,
  'ScanBoardConnectType'
);
