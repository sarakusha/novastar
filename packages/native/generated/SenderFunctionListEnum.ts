import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum SenderFunctionListEnumEnum {
  ABL = 0,
  ITMO = 1,
  EDE = 2,
  FreeRoute = 3,
  VirtualPixel = 4,
  BiggerLoad = 5,
  ReturnFactory = 6,
  UnKnow = 65535,
}
/**
 * Codec for {@link SenderFunctionListEnumEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2452
 */
export const SenderFunctionListEnum = EnumFromString(
  SenderFunctionListEnumEnum,
  'SenderFunctionListEnum'
);
