import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum LSChipEnumEnum {
  LS6616 = 1,
  LS6618 = 2,
  LS9918 = 3,
  LS9929 = 4,
  LS9961 = 5,
  LS9930 = 6,
  LS9919 = 7,
  LS9935 = 8,
  LS9917 = 9,
  LS9926 = 10, // 0xA
  LS9920 = 11, // 0xB
  LS9935B = 12, // 0xC
  LS9928 = 13, // 0xD
  LS9901 = 14, // 0xE
  LS9903 = 15, // 0xF
  LS9004 = 16, // 0x10
  LS9936 = 17, // 0x11
  LS9812 = 18, // 0x12
  LS9806 = 19, // 0x13
  LS9931 = 20, // 0x14
  LS9937 = 24, // 0x18
  LS9956 = 25, // 0x19
  LS9005 = 26, // 0x1A
  LS9932 = 30,
}
/**
 * Codec for {@link LSChipEnumEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipLSBase.decompiled.cs:1389
 */
export const LSChipEnum = EnumFromString(LSChipEnumEnum, 'LSChipEnum');
