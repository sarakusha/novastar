import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum RedundantStateTypeEnum {
  OK = 0,
  Error = 1,
  Unknown = 255,
}
/**
 * Codec for {@link RedundantStateTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2030
 */
export const RedundantStateType = EnumFromString(RedundantStateTypeEnum, 'RedundantStateType');
