import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum AutoAdjustFreqTypeEnum {
  Freq_50HZ = 192, // 0xC0
  Freq_60HZ,
  Freq_75HZ,
  Freq_120HZ,
  Freq_48HZ,
  Freq_30HZ,
  Freq_85HZ,
  Freq_100HZ,
  Freq_24HZ,
  Freq_72HZ,
  Freq_25HZ,
  Freq_240HZ,
}
/**
 * Codec for {@link AutoAdjustFreqTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2463
 */
export const AutoAdjustFreqType = EnumFromString(AutoAdjustFreqTypeEnum, 'AutoAdjustFreqType');
