import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum MessageTypeEnum {
  SCREEN_AREA_ACQUIRER_TOPOLOGY_SHOW = 1,
  SCREEN_AREA_ACQUIRER_TOPOLOGY_CLOSE = 2,
  DVI_COEFFICIENT_UPLOAD_START = 3,
  DVI_COEFFICIENT_UPLOAD_END = 4,
  UNKNOWN = 0,
}
/**
 * Codec for {@link MessageTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:29137
 */
export const MessageType = EnumFromString(MessageTypeEnum, 'MessageType');
