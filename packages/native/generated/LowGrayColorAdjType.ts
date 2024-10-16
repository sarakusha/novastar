import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum LowGrayColorAdjTypeEnum {
  Closed = 0,
  Effect4 = 4,
  Effect5 = 5,
  Effect6 = 6,
  Effect7 = 7,
  Effect8 = 8,
  Effect9 = 9,
  Effect10 = 10, // 0xA
  Effect11 = 11, // 0xB
  Effect12 = 12, // 0xC
  Effect13 = 13, // 0xD
  Effect14 = 14, // 0xE
  Effect15 = 15,
}
/**
 * Codec for {@link LowGrayColorAdjTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:66684
 */
export const LowGrayColorAdjType = EnumFromString(LowGrayColorAdjTypeEnum, 'LowGrayColorAdjType');
