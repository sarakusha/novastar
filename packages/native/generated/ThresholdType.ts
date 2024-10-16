import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum ThresholdTypeEnum {
  None,
  Grade1,
  Grade2,
  Grade3,
  Grade4,
  Grade5,
  Grade6,
  Grade7,
  Grade8,
}
/**
 * Codec for {@link ThresholdTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:76653
 */
export const ThresholdType = EnumFromString(ThresholdTypeEnum, 'ThresholdType');
