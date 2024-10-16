import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCFD325AExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsUseNewModule: common.Bool, // #2088
      ChipLibVersion: common.UInt8, // #2090
      FirstRegValue: common.UInt16, // #2092
      SecondRegValue: common.UInt16, // #2094
      ThirdRegValue: common.UInt16, // #2096
      FourthRegValue: common.UInt16, // #2098
      LowAshEnhanceUniformity: common.UInt8, // #2100
      LineBlankStrength: common.UInt8, // #2112
      LineBlankEnhanceModeEn: common.Bool, // #2125
      CouplingStrengthAdjust: common.UInt8, // #2137
      OpenTestPointAdjust: common.UInt8, // #2149
      CouplingOptimizationEn: common.Bool, // #2161
      CouplingRangeAdjust: common.UInt8, // #2177
      PerDriverEnable: common.Bool, // #2189
      OpenProtectEnable: common.Bool, // #2205
      ScanMode: common.UInt8, // #2221
      CurrentGear: common.UInt8, // #2233
      LowGrayCompsentionStrength: common.UInt8, // #2245
      OpenDynamicTestEnable: common.Bool, // #2257
      CurrentCompsentionEnable: common.Bool, // #2273
      ConstantCurrentInflectionPoint: common.UInt8, // #2289
      GclkDoubleLine: common.Bool, // #2317
      DynamicEnergySavingEn: common.Bool, // #2333
      LineEliminationLength: common.UInt8, // #2349
      OpenSpeed: common.UInt8, // #2361
      PerDriverMode: common.UInt8, // #2373
      PerDriverTimeSetting: common.UInt8, // #2385
      OpentestThresholdValue: common.UInt8, // #2397
      LowGrayGoodLevel: common.UInt8, // #2409
      SetWeakup: common.UInt8, // #2421
    }),
  ],
  'ChipCFD325AExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD325AExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD325A.decompiled.cs:2085
 */
export const ChipCFD325AExtendProperty = t.intersection(
  [
    ChipCFD325AExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD325AExtendProperty') }),
  ],
  'ChipCFD325AExtendProperty'
);
export interface ChipCFD325AExtendProperty extends t.TypeOf<typeof ChipCFD325AExtendProperty> {}
