import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum DetectPointTypeEnum {
  EarlyDeath,
  OpenCircuit,
  ShortCircuit,
  BothDivision,
  BothNoDivision,
  FourTypesCircuit,
  FiveTypesAllIn,
  None,
}
/**
 * Codec for {@link DetectPointTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:9037
 */
export const DetectPointType = EnumFromString(DetectPointTypeEnum, 'DetectPointType');
