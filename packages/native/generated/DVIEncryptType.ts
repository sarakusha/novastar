import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum DVIEncryptTypeEnum {
  None = 255, // 0xFF
  EnableEncrypt = 72, // 0x48
  DisableEncrypt = 73,
}
/**
 * Codec for {@link DVIEncryptTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2156
 */
export const DVIEncryptType = EnumFromString(DVIEncryptTypeEnum, 'DVIEncryptType');
