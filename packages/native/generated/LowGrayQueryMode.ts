import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum LowGrayQueryModeEnum {
  None,
  GrayEnhance3,
  GrayEnhance7,
}
/**
 * Codec for {@link LowGrayQueryModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:1987
 */
export const LowGrayQueryMode = EnumFromString(LowGrayQueryModeEnum, 'LowGrayQueryMode');
