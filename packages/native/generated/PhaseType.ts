import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum PhaseTypeEnum {
  TwoPhase,
  FourPhase,
}
/**
 * Codec for {@link PhaseTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:71341
 */
export const PhaseType = EnumFromString(PhaseTypeEnum, 'PhaseType');
