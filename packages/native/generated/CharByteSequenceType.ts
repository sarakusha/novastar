import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum CharByteSequenceTypeEnum {
  UpDown_LeftRight,
  UpDown_RightLeft,
  DownUp_LeftRight,
  DownUp_RightLeft,
  LeftRight_UpDown,
  LeftRight_DownUp,
  RightLeft_UpDown,
  RightLeft_DownUp,
}
/**
 * Codec for {@link CharByteSequenceTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:73680
 */
export const CharByteSequenceType = EnumFromString(
  CharByteSequenceTypeEnum,
  'CharByteSequenceType'
);
