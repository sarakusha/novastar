import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum EMCFunctionEnum {
  EMCClose = 0,
  EMCWeak = 5,
  EMCMedium = 21, // 0x15
  EMCStrong = 37,
}
/**
 * Codec for {@link EMCFunctionEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:1695
 */
export const EMCFunction = EnumFromString(EMCFunctionEnum, 'EMCFunction');
