import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum ControlModeTypeEnum {
  NormalMode = 0,
  BlackMode = 1,
  LockMode = 2,
  Unknown = 255,
}
/**
 * Codec for {@link ControlModeTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:554
 */
export const ControlModeType = EnumFromString(ControlModeTypeEnum, 'ControlModeType');
