import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum VideoSourceEnum {
  Bit8,
  Bit10,
  Bit10HDR,
  unkown,
}
/**
 * Codec for {@link VideoSourceEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2213
 */
export const VideoSource = EnumFromString(VideoSourceEnum, 'VideoSource');
