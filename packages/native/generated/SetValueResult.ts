import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum SetValueResultEnum {
  DataOutRange,
  IndexOutRange,
  Ok,
  DataIsNull,
}
/**
 * Codec for {@link SetValueResultEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5850B.decompiled.cs:4667
 */
export const SetValueResult = EnumFromString(SetValueResultEnum, 'SetValueResult');
