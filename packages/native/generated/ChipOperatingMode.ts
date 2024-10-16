import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum ChipOperatingModeEnum {
  Mbi5042GrayEnhanced = 5,
  Gray10BitMode = 80, // 0x50
  Unknown = 255,
}
/**
 * Codec for {@link ChipOperatingModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:1703
 */
export const ChipOperatingMode = EnumFromString(ChipOperatingModeEnum, 'ChipOperatingMode');
