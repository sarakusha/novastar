import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum PasswordLogTypeEnum {
  ADVANCED_USER_PW,
  DEBUGER_USER_PW,
  DEMOUGER_USER_PW,
}
/**
 * Codec for {@link PasswordLogTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:74143
 */
export const PasswordLogType = EnumFromString(PasswordLogTypeEnum, 'PasswordLogType');
