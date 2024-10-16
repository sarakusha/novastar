import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum GammaStateEnum {
  COMMON,
  HDR,
  HLG,
}
/**
 * Codec for {@link GammaStateEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:71922
 */
export const GammaState = EnumFromString(GammaStateEnum, 'GammaState');
