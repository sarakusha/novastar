import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum ModuleScanModeEnum {
  RowScanMode,
  ColumnScanMode,
  UnKnown,
}
/**
 * Codec for {@link ModuleScanModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2318
 */
export const ModuleScanMode = EnumFromString(ModuleScanModeEnum, 'ModuleScanMode');
