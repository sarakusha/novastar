import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum HWSoftwareSpaceResEnum {
  OK = 0,
  NotSupportDevice = 1,
  NoServerObject = 2,
  FileError = 3,
  DataError = 4,
  Busy = 5,
  Unknown = 255,
}
/**
 * Codec for {@link HWSoftwareSpaceResEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.CommonInfoAccessor.decompiled.cs:83
 */
export const HWSoftwareSpaceRes = EnumFromString(HWSoftwareSpaceResEnum, 'HWSoftwareSpaceRes');
