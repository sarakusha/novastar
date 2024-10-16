import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum HDRTypeEnum {
  HDR10 = 88, // 0x58
  HLG = 120,
}
/**
 * Codec for {@link HDRTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2371
 */
export const HDRType = EnumFromString(HDRTypeEnum, 'HDRType');
