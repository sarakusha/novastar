import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum StandbyModeEnum {
  Normal = 0,
  PowerSave = 5,
}
/**
 * Codec for {@link StandbyModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2220
 */
export const StandbyMode = EnumFromString(StandbyModeEnum, 'StandbyMode');
