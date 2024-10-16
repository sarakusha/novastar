import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum SocketModeTypeEnum {
  LessOrEqual4_Data2 = 0,
  LessOrEqual4_Data1 = 1,
  LessOrEqual8_Data1 = 2,
  LessOrEqual8_Data2 = 3,
  MoreThan8 = 4,
  Unknown = 255,
}
/**
 * Codec for {@link SocketModeTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:1676
 */
export const SocketModeType = EnumFromString(SocketModeTypeEnum, 'SocketModeType');
