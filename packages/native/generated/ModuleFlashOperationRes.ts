import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum ModuleFlashOperationResEnum {
  OK,
  CheckSumErr,
  ComunicationErr,
  HardwareErr,
  DataError,
  SettingTopologyErr,
  NoCoefs,
}
/**
 * Codec for {@link ModuleFlashOperationResEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.CorrectionProtocol.decompiled.cs:1618
 */
export const ModuleFlashOperationRes = EnumFromString(
  ModuleFlashOperationResEnum,
  'ModuleFlashOperationRes'
);
