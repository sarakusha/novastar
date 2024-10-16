import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum NoSignalModeEnum {
  BlackScreen,
  LastFrame,
  PrestorePicture,
}
/**
 * Codec for {@link NoSignalModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.GigabitController.ProgramInnerData.decompiled.cs:880
 */
export const NoSignalMode = EnumFromString(NoSignalModeEnum, 'NoSignalMode');
