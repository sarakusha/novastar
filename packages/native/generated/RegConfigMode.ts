import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum RegConfigModeEnum {
  All = 0,
  Signal = 5,
}
/**
 * Codec for {@link RegConfigModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2517
 */
export const RegConfigMode = EnumFromString(RegConfigModeEnum, 'RegConfigMode');
