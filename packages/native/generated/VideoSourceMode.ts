import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum VideoSourceModeEnum {
  Source8,
  Source10,
  Source12,
  Source16,
}
/**
 * Codec for {@link VideoSourceModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:71910
 */
export const VideoSourceMode = EnumFromString(VideoSourceModeEnum, 'VideoSourceMode');
