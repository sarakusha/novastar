import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum GammaAdjustEnumEnum {
  AllGammaPara,
  OnlyGammaCoeff,
  LSGamma,
  Unknown,
}
/**
 * Codec for {@link GammaAdjustEnumEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:1668
 */
export const GammaAdjustEnum = EnumFromString(GammaAdjustEnumEnum, 'GammaAdjustEnum');
