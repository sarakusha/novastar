import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum GammaSourceEnum {
  Bit8,
  Bit10,
  Bit10HDR,
  unkown,
}
/**
 * Codec for {@link GammaSourceEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:575
 */
export const GammaSource = EnumFromString(GammaSourceEnum, 'GammaSource');
