import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum FlashCheckErrorTypeEnum {
  CommunicationError,
  HardwareError,
  CorrectionCodeError,
  FlashTopologyError,
}
/**
 * Codec for {@link FlashCheckErrorTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:72878
 */
export const FlashCheckErrorType = EnumFromString(FlashCheckErrorTypeEnum, 'FlashCheckErrorType');
