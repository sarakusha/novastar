import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum CoefType2Enum {
  UnKnown,
  CommonCorrection,
  LowLumCorrection,
  BlueWhiteCorrection,
  BrightDarkLineFix,
  MultiLayerBrightCorrection,
  BrightDarkLineDoc,
}
/**
 * Codec for {@link CoefType2Enum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.CorrectionProtocol.decompiled.cs:1965
 */
export const CoefType2 = EnumFromString(CoefType2Enum, 'CoefType2');
