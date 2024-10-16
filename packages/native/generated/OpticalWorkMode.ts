import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum OpticalWorkModeEnum {
  OpticalCopy = 0,
  OpticalBackup = 80, // 0x50
  Unknown = 81,
}
/**
 * Codec for {@link OpticalWorkModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2339
 */
export const OpticalWorkMode = EnumFromString(OpticalWorkModeEnum, 'OpticalWorkMode');
