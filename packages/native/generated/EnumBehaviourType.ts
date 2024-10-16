import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum EnumBehaviourTypeEnum {
  NotUsed,
  SendPmData,
  UIConstructor,
  PackageConstructor,
  ReadData,
  UseTemplatePath,
  RegDefaultValue,
  RegCount,
  Calculate,
  ScanType,
  RemoveBadPoint,
}
/**
 * Codec for {@link EnumBehaviourTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.ChipGroupManager.decompiled.cs:491
 */
export const EnumBehaviourType = EnumFromString(EnumBehaviourTypeEnum, 'EnumBehaviourType');
