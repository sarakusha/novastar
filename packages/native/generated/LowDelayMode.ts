import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum LowDelayModeEnum {
  CommonDelay = 0,
  LowDelay = 120,
}
/**
 * Codec for {@link LowDelayModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2257
 */
export const LowDelayMode = EnumFromString(LowDelayModeEnum, 'LowDelayMode');
