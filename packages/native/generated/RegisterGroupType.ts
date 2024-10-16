import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum RegisterGroupTypeEnum {
  FirstGroup,
  SecondGroup,
  ThirdGroup,
  FourthGroup,
  OldChipDefaultGroup,
  SpecialGroup,
}
/**
 * Codec for {@link RegisterGroupTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:1610
 */
export const RegisterGroupType = EnumFromString(RegisterGroupTypeEnum, 'RegisterGroupType');
