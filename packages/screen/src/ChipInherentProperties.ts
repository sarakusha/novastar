// noinspection JSUnusedLocalSymbols
import { ChipTypeEnum } from '@novastar/native/ChipType';
import { DetectPointTypeEnum } from '@novastar/native/DetectPointType';
import { ScanTypeEnum } from '@novastar/native/ScanType';

type ValueGain = readonly [value: number, gain: number];

/**
 * CurrentGainStepInfo
 */
type GainSteps = ReadonlyArray<ValueGain>;

type ChipInfo = Readonly<{
  ChipType: ChipTypeEnum;
  /**
   * isCommonChip
   */
  isCommon: boolean;
  /**
   * isSupportCurrentGain
   */
  hasGain: boolean;
  /**
   * isSupportPointDetect
   */
  hasPointDetect: boolean;
  channelCount: number;
  gainSteps?: GainSteps;
}>;

const chipInfo = (
  ChipType: ChipTypeEnum,
  isCommon: boolean,
  hasGain: boolean,
  hasPointDetect: boolean,
  channelCount: number,
  gainSteps?: GainSteps
): ChipInfo => ({
  ChipType,
  isCommon,
  hasGain,
  hasPointDetect,
  channelCount,
  gainSteps,
});

const gain16: GainSteps = Array(16).map<ValueGain>((_, index) => [
  16 * index,
  index >= 8 ? (56.25 + (index - 8) * 6.25) / 100 : (25 + 3.125 * index) / 100,
]);

const gain32: GainSteps = Array(32).map<ValueGain>((_, index) => [8 * index + 4, (index + 9) / 40]);

const gain64: GainSteps = Array(64).map<ValueGain>((_, index) => [
  4 * index + 2,
  index > 31 ? ((index - 32) * 3 + 33) / 65 : (index * 3 + 32) / 256,
]);

const gain384: GainSteps = Array(384).map<ValueGain>((_, index) => [
  index,
  index < 192 ? (index + 64) / 512 : (index - 128) / 256,
]);

const ChipInherentProperties: { [K in keyof typeof ChipTypeEnum]?: ChipInfo } = {
  Chip_CommonBase: chipInfo(ChipTypeEnum.Chip_CommonBase, true, false, false, 16),
  Chip_MBI5167: chipInfo(ChipTypeEnum.Chip_MBI5167, true, false, false, 8),
  Chip_SUM2017: chipInfo(ChipTypeEnum.Chip_SUM2017, true, false, false, 16),
  Chip_MBI5037: chipInfo(ChipTypeEnum.Chip_MBI5037, true, false, true, 16),
  Chip_MY9221: chipInfo(ChipTypeEnum.Chip_MY9221, false, false, false, 12),
  Chip_MY9231: chipInfo(ChipTypeEnum.Chip_MY9231, false, false, false, 12),
  Chip_TLS3001: chipInfo(ChipTypeEnum.Chip_TLS3001, false, false, false, 12),
  Chip_GW6205: chipInfo(ChipTypeEnum.Chip_GW6205, false, false, false, 12),
  Chip_UCS512C: chipInfo(ChipTypeEnum.Chip_UCS512C, false, false, false, 12),
  Chip_UCS1912: chipInfo(ChipTypeEnum.Chip_UCS1912, false, false, false, 12),
  Chip_LD1512: chipInfo(ChipTypeEnum.Chip_LD1512, false, false, false, 12),
  Chip_GW6202B: chipInfo(ChipTypeEnum.Chip_GW6202B, false, false, false, 12),
  Chip_MBI6030: chipInfo(ChipTypeEnum.Chip_MBI6030, true, false, true, 16),
  Chip_MBI6023: chipInfo(ChipTypeEnum.Chip_MBI6023, true, true, false, 16),
  Chip_MBI5124: chipInfo(ChipTypeEnum.Chip_MBI5124, true, false, false, 16),
  Chip_SM16017S: chipInfo(ChipTypeEnum.Chip_SM16017S, true, false, false, 16),
  Chip_MBI5124A: chipInfo(ChipTypeEnum.Chip_MBI5124A, true, false, false, 16),
  Chip_MBI5124New: chipInfo(ChipTypeEnum.Chip_MBI5124New, true, false, false, 16),
  Chip_RT5924: chipInfo(ChipTypeEnum.Chip_RT5924, true, false, false, 16),
  Chip_MY9868: chipInfo(ChipTypeEnum.Chip_MY9868, true, false, false, 16),
  Chip_MY9868A: chipInfo(ChipTypeEnum.Chip_MY9868A, true, false, false, 16),
  Chip_ICN2038: chipInfo(ChipTypeEnum.Chip_ICN2038, true, false, false, 16),
  Chip_ICN2038A: chipInfo(ChipTypeEnum.Chip_ICN2038A, true, false, false, 16),
  Chip_TLC5958: chipInfo(ChipTypeEnum.Chip_TLC5958, true, false, false, 16),
  Chip_TLC59581: chipInfo(ChipTypeEnum.Chip_TLC59581, true, false, false, 16),
  Chip_MBI5166: chipInfo(ChipTypeEnum.Chip_MBI5166, true, false, false, 16),
  Chip_MBI5266: chipInfo(ChipTypeEnum.Chip_MBI5266, true, false, true, 16),
  Chip_MBI5122: chipInfo(ChipTypeEnum.Chip_MBI5122, true, false, false, 16),
  Chip_MBI5041Q: chipInfo(ChipTypeEnum.Chip_MBI5041Q, true, false, false, 16),
  Chip_ICN2027: chipInfo(ChipTypeEnum.Chip_ICN2027, true, false, false, 16),
  Chip_LS9960: chipInfo(ChipTypeEnum.Chip_LS9960, true, false, false, 16),
  Chip_LS9918: chipInfo(ChipTypeEnum.Chip_LS9918, true, false, false, 16),
  Chip_LS9929: chipInfo(ChipTypeEnum.Chip_LS9929, true, false, false, 16),
  Chip_LS9926: chipInfo(ChipTypeEnum.Chip_LS9926, true, false, false, 16),
  Chip_LS9930: chipInfo(ChipTypeEnum.Chip_LS9930, true, false, false, 16),
  Chip_LS9935: chipInfo(ChipTypeEnum.Chip_LS9935, true, false, false, 16),
  Chip_ICND2100: chipInfo(ChipTypeEnum.Chip_ICND2100, true, false, false, 16),

  Chip_MBI5036: chipInfo(ChipTypeEnum.Chip_MBI5036, true, true, true, 16, gain64),
  Chip_SUM2017T: chipInfo(ChipTypeEnum.Chip_SUM2017T, true, true, false, 16, gain32),
  Chip_SUM2117: chipInfo(ChipTypeEnum.Chip_SUM2117, true, true, false, 16, gain32),
  Chip_SUM2017TD: chipInfo(ChipTypeEnum.Chip_SUM2017TD, true, true, false, 16, gain32),
  Chip_MBI5038: chipInfo(ChipTypeEnum.Chip_MBI5038, true, true, false, 16, gain64),
  Chip_MY9862: chipInfo(ChipTypeEnum.Chip_MY9862, true, true, true, 16, gain64),
  Chip_MY9862A: chipInfo(ChipTypeEnum.Chip_MY9862A, true, true, true, 16, gain64),
  Chip_ICN2038S: chipInfo(ChipTypeEnum.Chip_ICN2038S, true, true, true, 16, gain16),
  Chip_ICND2046: chipInfo(ChipTypeEnum.Chip_ICND2046, true, true, true, 16, gain16),
  Chip_FM6126: chipInfo(ChipTypeEnum.Chip_FM6126, true, true, true, 16, gain16),
  Chip_ICN2038S_Common: chipInfo(ChipTypeEnum.Chip_ICN2038S_Common, true, true, true, 16, gain16),
  Chip_MY9866: chipInfo(ChipTypeEnum.Chip_MY9866, true, true, true, 18, gain16),
  Chip_MY9866_Common: chipInfo(ChipTypeEnum.Chip_MY9866_Common, true, true, true, 18, gain16),

  /** */
  Chip_ICN2053: chipInfo(ChipTypeEnum.Chip_ICN2053, false, true, true, 16, gain384),
};

export const GetGainProportion = (gain: number): number => {
  if (gain < 14) return (12.5 + 1.4 * gain) / 100;
  if (gain < 23) return (31.9 + 1.4 * (gain - 14)) / 100;
  if (gain < 32) return (44.4 + 1.4 * (gain - 23)) / 100;
  if (gain < 41) return (56.9 + 1.4 * (gain - 32)) / 100;
  if (gain < 50) return (69.4 + 1.4 * (gain - 41)) / 100;
  if (gain < 59) return (81.9 + 1.4 * (gain - 50)) / 100;
  return (94.4 + 1.4 * (gain - 59)) / 100;
};

export const IsPWMChip = (ChipType: ChipTypeEnum): boolean =>
  [
    ChipTypeEnum.Chip_MBI5030,
    ChipTypeEnum.Chip_MBI5040,
    ChipTypeEnum.Chip_IT1505,
    ChipTypeEnum.Chip_TLC5948A,
    ChipTypeEnum.Chip_UCS9812,
    ChipTypeEnum.Chip_SM16188B,
    ChipTypeEnum.Chip_MBI5042,
    ChipTypeEnum.Chip_SM16136,
    ChipTypeEnum.Chip_MY9262,
    ChipTypeEnum.Chip_MY9263,
    ChipTypeEnum.Chip_MBI5050,
    ChipTypeEnum.Chip_RFT3630,
    ChipTypeEnum.Chip_SUM2030,
    ChipTypeEnum.Chip_SUM2130,
    ChipTypeEnum.Chip_MY9268,
    ChipTypeEnum.Chip_SCL8060,
    ChipTypeEnum.Chip_MBI5051,
    ChipTypeEnum.Chip_MBI5052,
    ChipTypeEnum.Chip_MBI5053,
    ChipTypeEnum.Chip_SM16158,
    ChipTypeEnum.Chip_TLC5958,
    ChipTypeEnum.Chip_TLC59581,
    ChipTypeEnum.Chip_MY9266,
    ChipTypeEnum.Chip_MY9366,
    ChipTypeEnum.Chip_MBI5042B,
    ChipTypeEnum.Chip_ISA2020,
    ChipTypeEnum.Chip_LS9960,
    ChipTypeEnum.Chip_LS9918,
    ChipTypeEnum.Chip_LS9929,
    ChipTypeEnum.Chip_LS9935,
    ChipTypeEnum.Chip_LS9930,
    ChipTypeEnum.Chip_LS9926,
    ChipTypeEnum.Chip_MBI5043,
    ChipTypeEnum.Chip_MBI5041B,
    ChipTypeEnum.Chip_MBIA043,
    ChipTypeEnum.Chip_MBI5041Q,
    ChipTypeEnum.Chip_SUM2028,
    ChipTypeEnum.Chip_MY9269,
    ChipTypeEnum.Chip_MBI5045,
    ChipTypeEnum.Chip_SUM2032,
    ChipTypeEnum.Chip_SUM2033,
    ChipTypeEnum.Chip_SUM2131,
    ChipTypeEnum.Chip_SUM2035,
    ChipTypeEnum.Chip_SUM2135,
    ChipTypeEnum.Chip_MBI5152,
    ChipTypeEnum.Chip_MY9221,
    ChipTypeEnum.Chip_MY9231,
    ChipTypeEnum.Chip_TLS3001,
    ChipTypeEnum.Chip_GW6205,
    ChipTypeEnum.Chip_UCS1912,
    ChipTypeEnum.Chip_LD1512,
    ChipTypeEnum.Chip_GW6202B,
    ChipTypeEnum.Chip_MBI6030,
    ChipTypeEnum.Chip_MBI6023,
    ChipTypeEnum.Chip_SM16159,
    ChipTypeEnum.Chip_MBI5151,
    ChipTypeEnum.Chip_MBI5155,
    ChipTypeEnum.Chip_MBI5252,
    ChipTypeEnum.Chip_MY9373,
    ChipTypeEnum.Chip_MBI5353,
    ChipTypeEnum.Chip_MBI5354,
    ChipTypeEnum.Chip_MBI5253,
    ChipTypeEnum.Chip_MBI5359,
    ChipTypeEnum.Chip_MBI5253B,
    ChipTypeEnum.Chip_ICN2053,
    ChipTypeEnum.Chip_ICND2055,
    ChipTypeEnum.Chip_ICN2065,
    ChipTypeEnum.Chip_ICN2050,
    ChipTypeEnum.Chip_MBI5051B,
    ChipTypeEnum.Chip_MY9348,
    ChipTypeEnum.Chip_MY9748,
    ChipTypeEnum.Chip_ICND2200,
    ChipTypeEnum.Chip_ICND2163,
    ChipTypeEnum.Chip_VOD5153,
    ChipTypeEnum.Chip_SM16169S,
    ChipTypeEnum.Chip_MBI5153,
    ChipTypeEnum.Chip_SM16359,
    ChipTypeEnum.Chip_UCS512C,
  ].includes(ChipType);

export const IsChangedOETableChip = (ChipType: ChipTypeEnum): boolean =>
  [
    ChipTypeEnum.Chip_MBI5166,
    ChipTypeEnum.Chip_MBI5266,
    ChipTypeEnum.Chip_MBI5124A,
    ChipTypeEnum.Chip_MBI5125A,
    ChipTypeEnum.Chip_LS9929,
    ChipTypeEnum.Chip_LS9935,
    ChipTypeEnum.Chip_LS9918,
    ChipTypeEnum.Chip_LS9926,
    ChipTypeEnum.Chip_LS9930,
  ].includes(ChipType);

export const IsSupport = (ChipType: ChipTypeEnum): boolean =>
  [
    ChipTypeEnum.Chip_CommonBase,
    ChipTypeEnum.Chip_ICN2038S_Common,
    ChipTypeEnum.Chip_ICN2027,
    ChipTypeEnum.Chip_MBI5036,
    ChipTypeEnum.Chip_MBI5038,
    ChipTypeEnum.Chip_TLC5929,
    ChipTypeEnum.Chip_RT5924,
    ChipTypeEnum.Chip_MY9163,
    ChipTypeEnum.Chip_MBI5042,
    ChipTypeEnum.Chip_SM16136,
    ChipTypeEnum.Chip_MY9262,
    ChipTypeEnum.Chip_MY9263,
    ChipTypeEnum.Chip_MBI5050,
    ChipTypeEnum.Chip_DM13H,
    ChipTypeEnum.Chip_MBI5030,
    ChipTypeEnum.Chip_P2510,
    ChipTypeEnum.Chip_P2518,
    ChipTypeEnum.Chip_SUM2017,
    ChipTypeEnum.Chip_SUM2017T,
    ChipTypeEnum.Chip_SUM2117,
    ChipTypeEnum.Chip_SUM2017TD,
    ChipTypeEnum.Chip_SM16027,
    ChipTypeEnum.Chip_SUM2030,
    ChipTypeEnum.Chip_SUM2130,
    ChipTypeEnum.Chip_SUM2018,
    ChipTypeEnum.Chip_MBI5034,
    ChipTypeEnum.Chip_MBI5122,
    ChipTypeEnum.Chip_MBI5040,
    ChipTypeEnum.Chip_MBI5167,
    ChipTypeEnum.Chip_IT1505,
    ChipTypeEnum.Chip_TLC5948A,
    ChipTypeEnum.Chip_UCS9812,
    ChipTypeEnum.Chip_SM16188B,
    ChipTypeEnum.Chip_MY9268,
    ChipTypeEnum.Chip_SCL8060,
    ChipTypeEnum.Chip_MBI5224,
    ChipTypeEnum.Chip_MBI5051,
    ChipTypeEnum.Chip_MBI5052,
    ChipTypeEnum.Chip_SM16158,
    ChipTypeEnum.Chip_ISA2020,
    ChipTypeEnum.Chip_MBI5053,
    ChipTypeEnum.Chip_TLC5958,
    ChipTypeEnum.Chip_TLC59581,
    ChipTypeEnum.Chip_MY9266,
    ChipTypeEnum.Chip_MY9366,
    ChipTypeEnum.Chip_MBI5042B,
    ChipTypeEnum.Chip_MBI5041B,
    ChipTypeEnum.Chip_MBI5043,
    ChipTypeEnum.Chip_MBI5041Q,
    ChipTypeEnum.Chip_SUM2028,
    ChipTypeEnum.Chip_MBIA043,
    ChipTypeEnum.Chip_MY9269,
    ChipTypeEnum.Chip_MBI5045,
    ChipTypeEnum.Chip_MBI5039,
    ChipTypeEnum.Chip_MBI5037,
    ChipTypeEnum.Chip_SUM2032,
    ChipTypeEnum.Chip_SUM2033,
    ChipTypeEnum.Chip_SUM2131,
    ChipTypeEnum.Chip_SUM2035,
    ChipTypeEnum.Chip_SUM2135,
    ChipTypeEnum.Chip_MBI5152,
    ChipTypeEnum.Chip_MY9221,
    ChipTypeEnum.Chip_MY9231,
    ChipTypeEnum.Chip_TLS3001,
    ChipTypeEnum.Chip_GW6205,
    ChipTypeEnum.Chip_UCS512C,
    ChipTypeEnum.Chip_UCS1912,
    ChipTypeEnum.Chip_LD1512,
    ChipTypeEnum.Chip_GW6202B,
    ChipTypeEnum.Chip_MBI5124,
    ChipTypeEnum.Chip_MBI5125,
    ChipTypeEnum.Chip_SM16017S,
    ChipTypeEnum.Chip_ICN2038,
    ChipTypeEnum.Chip_ICN2038A,
    ChipTypeEnum.Chip_MY9868,
    ChipTypeEnum.Chip_MY9862,
    ChipTypeEnum.Chip_SM16207S,
    ChipTypeEnum.Chip_SM16237,
    ChipTypeEnum.Chip_SM16227,
    ChipTypeEnum.Chip_SM16237P,
    ChipTypeEnum.Chip_SM16227P,
    ChipTypeEnum.Chip_ICN2038S,
    ChipTypeEnum.Chip_ICND2046,
    ChipTypeEnum.Chip_FM6126,
    ChipTypeEnum.Chip_FM6142,
    ChipTypeEnum.Chip_MY9866,
    ChipTypeEnum.Chip_MY9868A,
    ChipTypeEnum.Chip_FM6182,
    ChipTypeEnum.Chip_MY9862A,
    ChipTypeEnum.Chip_MBI5166,
    ChipTypeEnum.Chip_MBI5125A,
    ChipTypeEnum.Chip_MBI5124A,
    ChipTypeEnum.Chip_MBI5266,
    ChipTypeEnum.Chip_MBI6030,
    ChipTypeEnum.Chip_MBI6023,
    ChipTypeEnum.Chip_SM16159,
    ChipTypeEnum.Chip_SM16169S,
    ChipTypeEnum.Chip_MBI5151,
    ChipTypeEnum.Chip_MBI5051B,
    ChipTypeEnum.Chip_MBI5155,
    ChipTypeEnum.Chip_MBI5252,
    ChipTypeEnum.Chip_MY9373,
    ChipTypeEnum.Chip_MBI5153,
    ChipTypeEnum.Chip_MBI5253,
    ChipTypeEnum.Chip_MBI5359,
    ChipTypeEnum.Chip_MY9348,
    ChipTypeEnum.Chip_MY9748,
    ChipTypeEnum.Chip_MBI5353,
    ChipTypeEnum.Chip_MBI5354,
    ChipTypeEnum.Chip_MBI5253B,
    ChipTypeEnum.Chip_ICN2050,
    ChipTypeEnum.Chip_ICND2055,
    ChipTypeEnum.Chip_ICN2065,
    ChipTypeEnum.Chip_ICN2053,
    ChipTypeEnum.Chip_LS9960,
    ChipTypeEnum.Chip_LS9929,
    ChipTypeEnum.Chip_LS9935,
    ChipTypeEnum.Chip_LS9926,
    ChipTypeEnum.Chip_LS9930,
    ChipTypeEnum.Chip_GW6808,
    ChipTypeEnum.Chip_LS9918,
    ChipTypeEnum.Chip_MBI5124New,
    ChipTypeEnum.Chip_ICND2163,
    ChipTypeEnum.Chip_VOD5153,
    ChipTypeEnum.Chip_MY9866_Common,
    ChipTypeEnum.Chip_SM16359,
    ChipTypeEnum.Chip_SM16259,
    ChipTypeEnum.Chip_SCL8080,
    ChipTypeEnum.Chip_ICND2100,
    ChipTypeEnum.Chip_MBI5759,
    ChipTypeEnum.Chip_XM11920G,
    ChipTypeEnum.Chip_XM11201G,
    ChipTypeEnum.Chip_XM11202G,
    ChipTypeEnum.Chip_MBI5251,
    ChipTypeEnum.Chip_MBI5264,
    ChipTypeEnum.Chip_MBI5254,
    ChipTypeEnum.Chip_MBI5850,
    ChipTypeEnum.Chip_MBI5754,
    ChipTypeEnum.Chip_CS2033,
    ChipTypeEnum.Chip_SCL8081,
    ChipTypeEnum.Chip_SM16369,
    ChipTypeEnum.Chip_DM413,
    ChipTypeEnum.Chip_YY6018,
    ChipTypeEnum.Chip_AXS6018,
    ChipTypeEnum.Chip_RT5965,
    ChipTypeEnum.Chip_FM6363,
    ChipTypeEnum.Chip_FM6353,
    ChipTypeEnum.Chip_FM6356,
    ChipTypeEnum.Chip_FM6555,
    ChipTypeEnum.Chip_FM6565,
    ChipTypeEnum.Chip_FM6047,
    ChipTypeEnum.Chip_LS9928,
    ChipTypeEnum.Chip_LS9935B,
    ChipTypeEnum.Chip_HS3257,
    ChipTypeEnum.Chip_HX8055,
    ChipTypeEnum.Chip_HX8864,
    ChipTypeEnum.Chip_MY9758,
    ChipTypeEnum.Chip_ICND2076,
    ChipTypeEnum.Chip_ICND2159,
    ChipTypeEnum.Chip_ICND2210,
    ChipTypeEnum.Chip_CS2066,
    ChipTypeEnum.Chip_CNS7253,
    ChipTypeEnum.Chip_CS2017,
    ChipTypeEnum.Chip_CS2017S,
    ChipTypeEnum.Chip_FM6127,
    ChipTypeEnum.Chip_CNS7153,
    ChipTypeEnum.Chip_ICND2112,
    ChipTypeEnum.Chip_UCS5603,
    ChipTypeEnum.Chip_SM16017DS,
    ChipTypeEnum.Chip_HX8055,
    ChipTypeEnum.Chip_DP3264,
  ].includes(ChipType);

export const IsSupportCurrentChipTypeEnum = (ChipType: ChipTypeEnum) =>
  ChipType !== ChipTypeEnum.Chip_SUM6082 && ChipType !== ChipTypeEnum.Chip_NVS6867;

export const IsPWMAndHavePartNum = (ChipType: ChipTypeEnum) =>
  [
    ChipTypeEnum.Chip_SUM2030,
    ChipTypeEnum.Chip_MY9268,
    ChipTypeEnum.Chip_SUM2130,
    ChipTypeEnum.Chip_MBI5030,
    ChipTypeEnum.Chip_MBI5042,
    ChipTypeEnum.Chip_MY9263,
    ChipTypeEnum.Chip_SM16136,
    ChipTypeEnum.Chip_MY9262,
    ChipTypeEnum.Chip_MBI5051,
    ChipTypeEnum.Chip_MBI5052,
    ChipTypeEnum.Chip_SM16158,
    ChipTypeEnum.Chip_MBI5053,
    ChipTypeEnum.Chip_MY9266,
    ChipTypeEnum.Chip_MY9366,
    ChipTypeEnum.Chip_MBI5042B,
    ChipTypeEnum.Chip_MBI5041B,
    ChipTypeEnum.Chip_MBI5043,
    ChipTypeEnum.Chip_SUM2028,
    ChipTypeEnum.Chip_MBIA043,
    ChipTypeEnum.Chip_MY9269,
    ChipTypeEnum.Chip_MBI5045,
    ChipTypeEnum.Chip_SUM2032,
    ChipTypeEnum.Chip_SUM2033,
    ChipTypeEnum.Chip_SUM2131,
    ChipTypeEnum.Chip_SUM2035,
    ChipTypeEnum.Chip_SUM2135,
    ChipTypeEnum.Chip_SM16159,
    ChipTypeEnum.Chip_SM16169S,
    ChipTypeEnum.Chip_MBI5152,
    ChipTypeEnum.Chip_MBI5151,
    ChipTypeEnum.Chip_MBI5155,
    ChipTypeEnum.Chip_MBI5051B,
    ChipTypeEnum.Chip_MBI5252,
    ChipTypeEnum.Chip_MY9373,
    ChipTypeEnum.Chip_MBI5353,
    ChipTypeEnum.Chip_MBI5354,
    ChipTypeEnum.Chip_MBI5153,
    ChipTypeEnum.Chip_MBI5253,
    ChipTypeEnum.Chip_MBI5359,
    ChipTypeEnum.Chip_MBI5253B,
    ChipTypeEnum.Chip_MY9348,
    ChipTypeEnum.Chip_MY9748,
    ChipTypeEnum.Chip_ICN2050,
    ChipTypeEnum.Chip_ICND2055,
    ChipTypeEnum.Chip_ICN2065,
    ChipTypeEnum.Chip_ICN2053,
    ChipTypeEnum.Chip_SM16359,
  ].includes(ChipType);

export const IsSupport5042GrayEnhanced = (ChipType: ChipTypeEnum) =>
  [
    ChipTypeEnum.Chip_MBI5042,
    ChipTypeEnum.Chip_MBI5030,
    ChipTypeEnum.Chip_SM16136,
    ChipTypeEnum.Chip_MY9263,
    ChipTypeEnum.Chip_MBI5042B,
    ChipTypeEnum.Chip_MBI5043,
    ChipTypeEnum.Chip_MBI5041B,
    ChipTypeEnum.Chip_SUM2028,
    ChipTypeEnum.Chip_MBIA043,
    ChipTypeEnum.Chip_MBI5041Q,
    ChipTypeEnum.Chip_MBI5045,
  ].includes(ChipType);

export const IsSupportMBI5041BNewTiming = (ChipType: ChipTypeEnum) =>
  [
    ChipTypeEnum.Chip_MBI5042B,
    ChipTypeEnum.Chip_SUM2028,
    ChipTypeEnum.Chip_MBIA043,
    ChipTypeEnum.Chip_MBI5043,
    ChipTypeEnum.Chip_MBI5041B,
    ChipTypeEnum.Chip_MBI5041Q,
    ChipTypeEnum.Chip_MBI5045,
    ChipTypeEnum.Chip_MBI5042,
  ].includes(ChipType);

export const IsSupportDriverInterDeghostEnable = (ChipType: ChipTypeEnum) =>
  [
    ChipTypeEnum.Chip_MBI5051,
    ChipTypeEnum.Chip_MBI5052,
    ChipTypeEnum.Chip_SM16158,
    ChipTypeEnum.Chip_SM16159,
    ChipTypeEnum.Chip_SM16169S,
    ChipTypeEnum.Chip_MBI5053,
    ChipTypeEnum.Chip_MBI5152,
    ChipTypeEnum.Chip_MBI5151,
    ChipTypeEnum.Chip_MBI5252,
    ChipTypeEnum.Chip_MBI5051B,
    ChipTypeEnum.Chip_MBI5155,
    ChipTypeEnum.Chip_MY9373,
    ChipTypeEnum.Chip_MBI5353,
    ChipTypeEnum.Chip_MBI5354,
    ChipTypeEnum.Chip_MY9348,
    ChipTypeEnum.Chip_MY9748,
    ChipTypeEnum.Chip_MBI5359,
    ChipTypeEnum.Chip_MBI5253,
  ].includes(ChipType);

export const IsSupportNewOERealizeWay = (ChipType: ChipTypeEnum) =>
  ChipType === ChipTypeEnum.Chip_MBI5124New;

export const IsSupportPhotographMode = (ChipType: ChipTypeEnum) =>
  [
    ChipTypeEnum.Chip_MY9868A,
    ChipTypeEnum.Chip_MY9862A,
    ChipTypeEnum.Chip_SM16207S,
    ChipTypeEnum.Chip_SM16237,
    ChipTypeEnum.Chip_SM16227,
    ChipTypeEnum.Chip_ICN2038A,
    ChipTypeEnum.Chip_ICN2038S,
    ChipTypeEnum.Chip_ICND2046,
    ChipTypeEnum.Chip_SM16237DS,
  ].includes(ChipType);

export const IsDoubleLatChip = (ChipType: ChipTypeEnum) =>
  [
    ChipTypeEnum.Chip_MY9868A,
    ChipTypeEnum.Chip_MY9862A,
    ChipTypeEnum.Chip_SM16207S,
    ChipTypeEnum.Chip_SM16237,
    ChipTypeEnum.Chip_SM16227,
    ChipTypeEnum.Chip_ICN2038A,
    ChipTypeEnum.Chip_ICN2038S,
    ChipTypeEnum.Chip_ICND2046,
    ChipTypeEnum.Chip_SM16237DS,
  ].includes(ChipType);

export const IsConfigRegisterConcernWithScanType = (ChipType: ChipTypeEnum) =>
  [
    ChipTypeEnum.Chip_MBI5050,
    ChipTypeEnum.Chip_SUM2030,
    ChipTypeEnum.Chip_SUM2130,
    ChipTypeEnum.Chip_MY9268,
    ChipTypeEnum.Chip_SCL8060,
    ChipTypeEnum.Chip_MY9266,
    ChipTypeEnum.Chip_MY9366,
    ChipTypeEnum.Chip_MY9269,
    ChipTypeEnum.Chip_MBI5051,
    ChipTypeEnum.Chip_MBI5052,
    ChipTypeEnum.Chip_SM16158,
    ChipTypeEnum.Chip_SM16159,
    ChipTypeEnum.Chip_SM16169S,
    ChipTypeEnum.Chip_MBI5053,
    ChipTypeEnum.Chip_TLC5958,
    ChipTypeEnum.Chip_TLC59581,
    ChipTypeEnum.Chip_SUM2032,
    ChipTypeEnum.Chip_SUM2033,
    ChipTypeEnum.Chip_SUM2131,
    ChipTypeEnum.Chip_SUM2035,
    ChipTypeEnum.Chip_SUM2135,
    ChipTypeEnum.Chip_MBI5152,
    ChipTypeEnum.Chip_MBI5151,
    ChipTypeEnum.Chip_MBI5051B,
    ChipTypeEnum.Chip_MBI5155,
    ChipTypeEnum.Chip_MBI5252,
    ChipTypeEnum.Chip_MY9373,
    ChipTypeEnum.Chip_MBI5353,
    ChipTypeEnum.Chip_MBI5354,
    ChipTypeEnum.Chip_MBI5153,
    ChipTypeEnum.Chip_MBI5253,
    ChipTypeEnum.Chip_MBI5359,
    ChipTypeEnum.Chip_MBI5253B,
    ChipTypeEnum.Chip_MY9348,
    ChipTypeEnum.Chip_MY9748,
    ChipTypeEnum.Chip_ICN2050,
    ChipTypeEnum.Chip_ICND2055,
    ChipTypeEnum.Chip_ICN2065,
    ChipTypeEnum.Chip_ICND2163,
    ChipTypeEnum.Chip_VOD5153,
    ChipTypeEnum.Chip_ICN2053,
    ChipTypeEnum.Chip_SM16359,
  ].includes(ChipType);

export const IsConfigRegisterConcernWithShiftUnitNum = (ChipType: ChipTypeEnum) =>
  [ChipTypeEnum.Chip_MBI6030, ChipTypeEnum.Chip_MBI6023].includes(ChipType);

export const GetDetectPointType = (ChipType: ChipTypeEnum): DetectPointTypeEnum => {
  switch (ChipType) {
    case ChipTypeEnum.Chip_MBI5030:
    case ChipTypeEnum.Chip_MBI5034:
    case ChipTypeEnum.Chip_MBI5038:
      return DetectPointTypeEnum.OpenCircuit;
    case ChipTypeEnum.Chip_MBI5036:
    case ChipTypeEnum.Chip_MBI5039:
    case ChipTypeEnum.Chip_RT5924:
      return DetectPointTypeEnum.BothNoDivision;
    case ChipTypeEnum.Chip_MBI5040:
    case ChipTypeEnum.Chip_MY9163:
    case ChipTypeEnum.Chip_TLC5929:
    case ChipTypeEnum.Chip_MY9862:
    case ChipTypeEnum.Chip_MBI5353:
    case ChipTypeEnum.Chip_MY9263:
    case ChipTypeEnum.Chip_SM16207S:
    case ChipTypeEnum.Chip_SM16237:
    case ChipTypeEnum.Chip_SM16227:
    case ChipTypeEnum.Chip_MBI5354:
    case ChipTypeEnum.Chip_MBI5359:
      return DetectPointTypeEnum.BothDivision;
    case ChipTypeEnum.Chip_DM13H:
    case ChipTypeEnum.Chip_MBI5037:
      return DetectPointTypeEnum.BothDivision;
    case ChipTypeEnum.Chip_MBI5051:
    case ChipTypeEnum.Chip_MBI5052:
    case ChipTypeEnum.Chip_MBI5053:
    case ChipTypeEnum.Chip_MBI5152:
    case ChipTypeEnum.Chip_MBI5153:
    case ChipTypeEnum.Chip_TLC5958:
    case ChipTypeEnum.Chip_MBI5266:
    case ChipTypeEnum.Chip_MBI5155:
    case ChipTypeEnum.Chip_MBI5252:
    case ChipTypeEnum.Chip_TLC59581:
    case ChipTypeEnum.Chip_MBI5051B:
    case ChipTypeEnum.Chip_MBI5253:
    case ChipTypeEnum.Chip_ICN2053:
    case ChipTypeEnum.Chip_MY9373:
    case ChipTypeEnum.Chip_ICND2055:
    case ChipTypeEnum.Chip_ICN2050:
    case ChipTypeEnum.Chip_ICN2065:
    case ChipTypeEnum.Chip_MBI5253B:
      return DetectPointTypeEnum.OpenCircuit;
    case ChipTypeEnum.Chip_MBI5045:
      return DetectPointTypeEnum.OpenCircuit;
    case ChipTypeEnum.Chip_IT1505:
      return DetectPointTypeEnum.BothDivision;
    default:
      return DetectPointTypeEnum.None;
  }
};

export const IsNoCurrentGainButConfig = (ChipType: ChipTypeEnum): boolean =>
  [
    ChipTypeEnum.Chip_SUM2017,
    ChipTypeEnum.Chip_SM16027,
    ChipTypeEnum.Chip_MBI5037,
    ChipTypeEnum.Chip_MY9221,
    ChipTypeEnum.Chip_TLC5948A,
    ChipTypeEnum.Chip_MY9231,
    ChipTypeEnum.Chip_MBI6030,
    ChipTypeEnum.Chip_MBI6023,
    ChipTypeEnum.Chip_RT5924,
    ChipTypeEnum.Chip_TLC5958,
    ChipTypeEnum.Chip_TLC59581,
    ChipTypeEnum.Chip_MBI5166,
    ChipTypeEnum.Chip_MBI5125A,
    ChipTypeEnum.Chip_MBI5124A,
    ChipTypeEnum.Chip_MBI5266,
    ChipTypeEnum.Chip_MBI5122,
    ChipTypeEnum.Chip_MBI5125,
    ChipTypeEnum.Chip_MBI5124,
    ChipTypeEnum.Chip_SM16017S,
    ChipTypeEnum.Chip_SM16207S,
    ChipTypeEnum.Chip_MBI5124New,
  ].includes(ChipType);

export const DetectPointIsConfigOtherReg = (ChipType: ChipTypeEnum): boolean =>
  [
    ChipTypeEnum.Chip_MBI5153,
    ChipTypeEnum.Chip_ICN2053,
    ChipTypeEnum.Chip_ICND2055,
    ChipTypeEnum.Chip_ICN2065,
    ChipTypeEnum.Chip_ICN2050,
    ChipTypeEnum.Chip_MBI5252,
  ].includes(ChipType);

export const CanManualAdjustRefreshRate = (
  chipType: ChipTypeEnum,
  scanType: ScanTypeEnum
): boolean => {
  switch (chipType) {
    case ChipTypeEnum.Chip_MBI5030:
    case ChipTypeEnum.Chip_MBI5040:
    case ChipTypeEnum.Chip_MBI5042:
    case ChipTypeEnum.Chip_RFT3630:
    case ChipTypeEnum.Chip_MBI5042B:
    case ChipTypeEnum.Chip_MBI5045:
    case ChipTypeEnum.Chip_MY9262:
    case ChipTypeEnum.Chip_SM16136:
    case ChipTypeEnum.Chip_SUM2028:
    case ChipTypeEnum.Chip_MBI5043:
    case ChipTypeEnum.Chip_MBIA043:
    case ChipTypeEnum.Chip_MBI5041B:
    case ChipTypeEnum.Chip_MBI5041Q:
    case ChipTypeEnum.Chip_MY9263:
    case ChipTypeEnum.Chip_UCS9812:
    case ChipTypeEnum.Chip_TLC5948A:
    case ChipTypeEnum.Chip_SM16188B:
    case ChipTypeEnum.Chip_IT1505:
      return scanType !== ScanTypeEnum.Scan_static;
    case ChipTypeEnum.Chip_MBI5050:
    case ChipTypeEnum.Chip_SCL8060:
    case ChipTypeEnum.Chip_SUM2030:
    case ChipTypeEnum.Chip_MY9268:
    case ChipTypeEnum.Chip_MBI5051:
    case ChipTypeEnum.Chip_MBI5052:
    case ChipTypeEnum.Chip_MBI5053:
    case ChipTypeEnum.Chip_MY9266:
    case ChipTypeEnum.Chip_MY9269:
    case ChipTypeEnum.Chip_SUM2032:
    case ChipTypeEnum.Chip_MBI5152:
    case ChipTypeEnum.Chip_MY9221:
    case ChipTypeEnum.Chip_MBI5151:
    case ChipTypeEnum.Chip_MBI5153:
    case ChipTypeEnum.Chip_MBI6030:
    case ChipTypeEnum.Chip_TLC5958:
    case ChipTypeEnum.Chip_SM16158:
    case ChipTypeEnum.Chip_MBI5155:
    case ChipTypeEnum.Chip_MBI6023:
    case ChipTypeEnum.Chip_MY9366:
    case ChipTypeEnum.Chip_MBI5252:
    case ChipTypeEnum.Chip_SM16159:
    case ChipTypeEnum.Chip_TLS3001:
    case ChipTypeEnum.Chip_TLC59581:
    case ChipTypeEnum.Chip_MBI5353:
    case ChipTypeEnum.Chip_GW6205:
    case ChipTypeEnum.Chip_GW6202B:
    case ChipTypeEnum.Chip_SUM2033:
    case ChipTypeEnum.Chip_MY9231:
    case ChipTypeEnum.Chip_SUM2130:
    case ChipTypeEnum.Chip_SUM2131:
    case ChipTypeEnum.Chip_MBI5051B:
    case ChipTypeEnum.Chip_MBI5253:
    case ChipTypeEnum.Chip_ICN2053:
    case ChipTypeEnum.Chip_MY9373:
    case ChipTypeEnum.Chip_MY9348:
    case ChipTypeEnum.Chip_SUM2035:
    case ChipTypeEnum.Chip_SUM2135:
    case ChipTypeEnum.Chip_ICND2055:
    case ChipTypeEnum.Chip_ICN2050:
    case ChipTypeEnum.Chip_MBI5354:
    case ChipTypeEnum.Chip_MBI5359:
    case ChipTypeEnum.Chip_ICN2065:
    case ChipTypeEnum.Chip_MBI5253B:
    case ChipTypeEnum.Chip_MY9748:
    case ChipTypeEnum.Chip_LD1512:
    case ChipTypeEnum.Chip_UCS1912:
    case ChipTypeEnum.Chip_UCS512C:
    case ChipTypeEnum.Chip_ICND2163:
    case ChipTypeEnum.Chip_SM16169S:
    case ChipTypeEnum.Chip_VOD5153:
      return false;
    default:
      return true;
  }
};
