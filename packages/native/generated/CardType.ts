import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum CardTypeEnum {
  Scanner_Card,
  FunctionCard_1,
  FunctionCard_2,
  FunctionCard_3,
  FunctionCard_4,
  FunctionCard_5,
  FunctionCard_6,
  FunctionCard_7,
  FunctionCard_8,
  FunctionCard_9,
  FunctionCard_10,
  FunctionCard_11,
  FunctionCard_12,
  FunctionCard_13,
  FunctionCard_14,
  FunctionCard_15,
}
/**
 * Codec for {@link CardTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:1922
 */
export const CardType = EnumFromString(CardTypeEnum, 'CardType');
