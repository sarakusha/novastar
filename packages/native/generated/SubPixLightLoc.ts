import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum SubPixLightLocEnum {
  En_AllLight = 16777215, // 0xFF_FFFF
  En_Loc1 = 2,
  En_Loc2 = 4,
}
/**
 * Codec for {@link SubPixLightLocEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.CorrectionProtocol.decompiled.cs:1292
 */
export const SubPixLightLoc = EnumFromString(SubPixLightLocEnum, 'SubPixLightLoc');
