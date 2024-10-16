import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum ShowTypeWhenPortDisconnectedEnum {
  BlackScreen = 0,
  LastFrame = 1,
  Unknown = 255,
}
/**
 * Codec for {@link ShowTypeWhenPortDisconnectedEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2007
 */
export const ShowTypeWhenPortDisconnected = EnumFromString(
  ShowTypeWhenPortDisconnectedEnum,
  'ShowTypeWhenPortDisconnected'
);
