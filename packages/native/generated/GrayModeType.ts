import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum GrayModeTypeEnum {
  Lowlight = 0,
  Normallight = 1,
  Highlight = 2,
  LowerLowLight = 3,
  Unknown = 255,
}
/**
 * Codec for {@link GrayModeTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:1968
 */
export const GrayModeType = EnumFromString(GrayModeTypeEnum, 'GrayModeType');
