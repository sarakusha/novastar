import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum ScreenDriveTypeEnum {
  Concurrent = 0,
  Serial = 5,
}
/**
 * Codec for {@link ScreenDriveTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2137
 */
export const ScreenDriveType = EnumFromString(ScreenDriveTypeEnum, 'ScreenDriveType');
