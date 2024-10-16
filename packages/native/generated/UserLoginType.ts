import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum UserLoginTypeEnum {
  UnLogin,
  Admin,
  Debuger,
  Windicator,
  AsyncLogin,
}
/**
 * Codec for {@link UserLoginTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:71804
 */
export const UserLoginType = EnumFromString(UserLoginTypeEnum, 'UserLoginType');
