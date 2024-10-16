import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum AudioFrequencyModeEnum {
  F_96KHZ,
  F_48KHZ,
}
/**
 * Codec for {@link AudioFrequencyModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2225
 */
export const AudioFrequencyMode = EnumFromString(AudioFrequencyModeEnum, 'AudioFrequencyMode');
