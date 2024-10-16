import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum CommonInfoCompeleteResultEnum {
  OK,
  VerNotComparable,
  CommunicationFault,
  DataError,
  ParseError,
  FileError,
  NotSupportDevice,
  NoServerObject,
  LZMAError,
}
/**
 * Codec for {@link CommonInfoCompeleteResultEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:71253
 */
export const CommonInfoCompeleteResult = EnumFromString(
  CommonInfoCompeleteResultEnum,
  'CommonInfoCompeleteResult'
);
