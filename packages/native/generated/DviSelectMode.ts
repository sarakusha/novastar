import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum DviSelectModeEnum {
  DVI = 88, // 0x58
  HDMI = 5,
  HDMI1 = 90, // 0x5A
  HDMI2 = 91, // 0x5B
  SDI = 1,
  DP = 95, // 0x5F
  Dual_DVI = 97, // 0x61
  HDBaseT = 63, // 0x3F
  LVDS = 107,
}
/**
 * Codec for {@link DviSelectModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2176
 */
export const DviSelectMode = EnumFromString(DviSelectModeEnum, 'DviSelectMode');
