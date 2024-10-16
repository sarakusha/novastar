import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum HDEnableModeEnum {
  Bit12 = 120, // 0x78
  Bit10 = 90, // 0x5A
  Bit8 = 5,
}
/**
 * Codec for {@link HDEnableModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2207
 */
export const HDEnableMode = EnumFromString(HDEnableModeEnum, 'HDEnableMode');
