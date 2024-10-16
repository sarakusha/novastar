import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum AudioControlModeEnum {
  HDMI,
  External,
}
/**
 * Codec for {@link AudioControlModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2171
 */
export const AudioControlMode = EnumFromString(AudioControlModeEnum, 'AudioControlMode');
