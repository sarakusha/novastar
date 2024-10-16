import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum RGBCIETypeEnum {
  Custom,
  PAL,
  NTSC,
}
/**
 * Codec for {@link RGBCIETypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:72201
 */
export const RGBCIEType = EnumFromString(RGBCIETypeEnum, 'RGBCIEType');
