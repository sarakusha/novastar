import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum ScanBoardDataTypeEnum {
  All,
  Position,
  Configuration,
}
/**
 * Codec for {@link ScanBoardDataTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:71373
 */
export const ScanBoardDataType = EnumFromString(ScanBoardDataTypeEnum, 'ScanBoardDataType');
