import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum DecodeTypeEnum {
  StaticNoCode = 0,
  Decode138 = 1,
  DicrectCode = 2,
  Decode595 = 3,
  LXY695x = 4,
  Decode5953 = 5,
  Decode5958 = 6,
  SM5266 = 7,
  ICN2012WEA = 8,
  LS9739_anode = 9,
  LS9739_cathode = 10, // 0xA
  DecodeICN2018_ICN2019 = 11, // 0xB
  LS9736_anode = 12, // 0xC
  Decode5972 = 13, // 0xD
  decodeTest = 14, // 0xE
  LS9737_anode = 15, // 0xF
  LS9735_anode = 16, // 0x10
  LS2018_anode = 17, // 0x11
  LS9737_cathode = 18, // 0x12
  SM5366 = 19, // 0x13
  MY7183 = 20, // 0x14
  LS9736_cathode = 21, // 0x15
  TC7261 = 22, // 0x16
  D7266 = 23, // 0x17
  CNS3018 = 24, // 0x18
  LS9737_Common = 25, // 0x19
  MBI5981 = 26, // 0x1A
  HX6158H = 27, // 0x1B
  MBI5986 = 28, // 0x1C
  DP32019 = 29, // 0x1D
  DP32020 = 30, // 0x1E
  MBI5988 = 31, // 0x1F
  FM7239A = 32, // 0x20
  SM5368 = 33, // 0x21
  FM7519 = 34, // 0x22
  CFD2138S = 35, // 0x23
  RT5918 = 36, // 0x24
  CX5710 = 37, // 0x25
  LS9737_1 = 38, // 0x26
  RT5916 = 39, // 0x27
  TA5013 = 40, // 0x28
  RT5958 = 41, // 0x29
  RT5960 = 42, // 0x2A
  RT5988 = 43, // 0x2B
  RT5990 = 44, // 0x2C
  RT5992 = 45, // 0x2D
  LS9735_Common = 46, // 0x2E
  VB5628 = 47, // 0x2F
  VB5658 = 48, // 0x30
  LS9708 = 49, // 0x31
  LS9716 = 50, // 0x32
  DP32129 = 51, // 0x33
  RT59X2 = 52, // 0x34
  LS9716_Common = 54, // 0x36
  LS9708_Common = 55, // 0x37
  HX6016 = 57, // 0x39
  HX6258 = 58, // 0x3A
  Unknown = 255,
}
/**
 * Codec for {@link DecodeTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:1727
 */
export const DecodeType = EnumFromString(DecodeTypeEnum, 'DecodeType');
