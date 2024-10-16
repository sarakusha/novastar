import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum SmartBrightAdjustTypeEnum {
  FixBright = 0,
  AutoBright = 1,
  OpticalFailureBright = 5,
}
/**
 * Codec for {@link SmartBrightAdjustTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:73020
 */
export const SmartBrightAdjustType = EnumFromString(
  SmartBrightAdjustTypeEnum,
  'SmartBrightAdjustType'
);
