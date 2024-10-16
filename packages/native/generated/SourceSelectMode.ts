import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum SourceSelectModeEnum {
  DVI = 16, // 0x10
  DVI1 = 17, // 0x11
  DVI2 = 18, // 0x12
  DVI3 = 19, // 0x13
  DVI4 = 20, // 0x14
  HDMI = 32, // 0x20
  DP = 48, // 0x30
  SDI = 64, // 0x40
  Dual_DVI = 80, // 0x50
  Dual_DVI1 = 81, // 0x51
  Dual_DVI2 = 82, // 0x52
  HDMI1_4 = 96, // 0x60
  HDMI1_41 = 97, // 0x61
  HDMI1_42 = 98, // 0x62
  HDMI1_43 = 99, // 0x63
  HDBaseT = 192,
}
/**
 * Codec for {@link SourceSelectModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2188
 */
export const SourceSelectMode = EnumFromString(SourceSelectModeEnum, 'SourceSelectMode');
