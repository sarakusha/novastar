import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum ScreenOperationModeEnum {
  OneScreen = 1,
  CombScreen = 2,
  UnKnow = 255,
}
/**
 * Codec for {@link ScreenOperationModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.CorrectionProtocol.decompiled.cs:1628
 */
export const ScreenOperationMode = EnumFromString(ScreenOperationModeEnum, 'ScreenOperationMode');
