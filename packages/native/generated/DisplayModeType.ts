import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum DisplayModeTypeEnum {
  BlackScreen = 0,
  LastFrame = 1,
  ShowLogo = 16, // 0x10
  Unknown = 255,
}
/**
 * Codec for {@link DisplayModeTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2014
 */
export const DisplayModeType = EnumFromString(DisplayModeTypeEnum, 'DisplayModeType');
