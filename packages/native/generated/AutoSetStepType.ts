import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum AutoSetStepTypeEnum {
  Module,
  OE,
  ModuleDataGroup,
  DataGroupSequence,
  RGBMapping,
  ScanType,
  ScanLineArray,
  ScanLineArray_NoCode,
  UnusedScan,
  FirstScanLine,
  PointDistribute,
  New_OE,
  New_RGBMapping,
  New_DataGroup,
  New_IrregularDataGroup,
  New_ScanType,
  New_PointDistribute,
  New_Complete,
  None,
}
/**
 * Codec for {@link AutoSetStepTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:74272
 */
export const AutoSetStepType = EnumFromString(AutoSetStepTypeEnum, 'AutoSetStepType');
