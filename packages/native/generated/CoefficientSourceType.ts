import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum CoefficientSourceTypeEnum {
  ScanBoardFlash = 0,
  ModuleFlash = 1,
  Unknown = 255,
}
/**
 * Codec for {@link CoefficientSourceTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:1994
 */
export const CoefficientSourceType = EnumFromString(
  CoefficientSourceTypeEnum,
  'CoefficientSourceType'
);
