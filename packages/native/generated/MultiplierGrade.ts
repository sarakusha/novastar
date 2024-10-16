import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum MultiplierGradeEnum {
  OneGrade = 0,
  TwoGrade = 2,
  ThreeGrade = 3,
  FourGrade = 4,
  SevenGrade = 5,
  EightGrade = 6,
}
/**
 * Codec for {@link MultiplierGradeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16259.decompiled.cs:48
 */
export const MultiplierGrade = EnumFromString(MultiplierGradeEnum, 'MultiplierGrade');
