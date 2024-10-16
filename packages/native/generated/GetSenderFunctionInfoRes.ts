import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum GetSenderFunctionInfoResEnum {
  ReadTimeOut,
  CheckFail,
  ServerLinkError,
  Succeed,
}
/**
 * Codec for {@link GetSenderFunctionInfoResEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:29899
 */
export const GetSenderFunctionInfoRes = EnumFromString(
  GetSenderFunctionInfoResEnum,
  'GetSenderFunctionInfoRes'
);
