import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum SubpixelLightPointLayoutEnum {
  unknow,
  RGB,
  RBG,
  GRB,
  GBR,
  BRG,
  BGR,
  RGGB,
  BGGR,
  GRBG,
  GBRG,
}
/**
 * Codec for {@link SubpixelLightPointLayoutEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.CorrectionProtocol.decompiled.cs:1298
 */
export const SubpixelLightPointLayout = EnumFromString(
  SubpixelLightPointLayoutEnum,
  'SubpixelLightPointLayout'
);
