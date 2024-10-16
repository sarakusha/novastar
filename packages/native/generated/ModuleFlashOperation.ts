import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum ModuleFlashOperationEnum {
  SaveToModuleFlash,
  LoadFromModuleFlash,
  SaveToModuleFlashFast,
  SaveToModuleFlashFastEx,
}
/**
 * Codec for {@link ModuleFlashOperationEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.CorrectionProtocol.decompiled.cs:1611
 */
export const ModuleFlashOperation = EnumFromString(
  ModuleFlashOperationEnum,
  'ModuleFlashOperation'
);
