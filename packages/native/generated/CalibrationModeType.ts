import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum CalibrationModeTypeEnum {
  Light = 0,
  Chroma = 1,
  Unknown = 255,
}
/**
 * Codec for {@link CalibrationModeTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:562
 */
export const CalibrationModeType = EnumFromString(CalibrationModeTypeEnum, 'CalibrationModeType');
