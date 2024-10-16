import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum ResetAndSwitchCommandTypeEnum {
  DEFAULT_PARAM,
  NO_ACTION_PARAM,
  RESET_OPERATION_PARAM,
  START_ACTION_PARAM,
}
/**
 * Codec for {@link ResetAndSwitchCommandTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2305
 */
export const ResetAndSwitchCommandType = EnumFromString(
  ResetAndSwitchCommandTypeEnum,
  'ResetAndSwitchCommandType'
);
