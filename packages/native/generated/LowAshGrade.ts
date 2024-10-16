import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum LowAshGradeEnum {
  NotEffective,
  OneGrade,
  TwoGrade,
  ThreeGrade,
}
/**
 * Codec for {@link LowAshGradeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16259.decompiled.cs:69
 */
export const LowAshGrade = EnumFromString(LowAshGradeEnum, 'LowAshGrade');
