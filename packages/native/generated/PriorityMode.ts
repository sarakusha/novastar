import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum PriorityModeEnum {
  None = 0,
  Graylevel = 85, // 0x55
  Contrast = 255,
}
/**
 * Codec for {@link PriorityModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2352
 */
export const PriorityMode = EnumFromString(PriorityModeEnum, 'PriorityMode');
