import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum OEPolarityTypeEnum {
  HighEnable = 0,
  LowEnable = 1,
  Unknown = 255,
}
/**
 * Codec for {@link OEPolarityTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:1710
 */
export const OEPolarityType = EnumFromString(OEPolarityTypeEnum, 'OEPolarityType');
