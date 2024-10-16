import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum TestModeEnum {
  Reserved1_Mode = 0,
  Reserved2_Mode = 1,
  Red_Mode = 2,
  Green_Mode = 3,
  Blue_Mode = 4,
  White_Mode = 5,
  HorizonLine_Mode = 6,
  VerticalLine_Mode = 7,
  InclineLine_Mode = 8,
  GrayIncrease_Mode = 9,
  Age_Mode = 10, // 0xA
  HardwareScreen_Mode = 11, // 0xB
  LogoTest = 16, // 0x10
  ParaFreeze = 32, // 0x20
  OEFreeze = 64,
}
/**
 * Codec for {@link TestModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:1942
 */
export const TestMode = EnumFromString(TestModeEnum, 'TestMode');
