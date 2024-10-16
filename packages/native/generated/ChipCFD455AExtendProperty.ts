import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCFD455AExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsUseNewModule: common.Bool, // #3162
      ChipLibVersion: common.UInt8, // #3164
      FirstRegValue: common.UInt16, // #3166
      SecondRegValue: common.UInt16, // #3168
      ThirdRegValue: common.UInt16, // #3170
      FourthRegValue: common.UInt16, // #3172
      LowAshEnhanceUniformity: common.UInt8, // #3174
      LineBlankStrength: common.UInt8, // #3186
      LineBlankEnhanceModeEn: common.Bool, // #3199
      CouplingStrengthAdjust: common.UInt8, // #3211
      OpenTestPointAdjust: common.UInt8, // #3223
      CouplingOptimizationEn: common.Bool, // #3235
      LowGrayCompsentionTimeSettingMode: common.UInt8, // #3247
      CouplingRangeAdjust: common.UInt8, // #3259
      PerDriverEnable: common.Bool, // #3271
      OpenProtectEnable: common.Bool, // #3283
      ScanMode: common.UInt8, // #3295
      CurrentGear: common.UInt8, // #3307
      LowGrayCompsentionStrength: common.UInt8, // #3319
      OpenDynamicTestEnable: common.Bool, // #3331
      CurrentCompsentionEnable: common.Bool, // #3343
      ConstantCurrentInflectionPoint: common.UInt8, // #3355
      DynamicEnergySavingEn: common.Bool, // #3383
      LineEliminationLength: common.UInt8, // #3395
      PerDriverMode: common.UInt8, // #3407
      PerDriverTimeSetting: common.UInt8, // #3419
      OpentestThresholdValue: common.UInt8, // #3431
      LowGrayGoodLevel: common.UInt8, // #3443
      SetWeakup: common.UInt8, // #3455
    }),
  ],
  'ChipCFD455AExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD455AExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD455A.decompiled.cs:3159
 */
export const ChipCFD455AExtendProperty = t.intersection(
  [
    ChipCFD455AExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD455AExtendProperty') }),
  ],
  'ChipCFD455AExtendProperty'
);
export interface ChipCFD455AExtendProperty extends t.TypeOf<typeof ChipCFD455AExtendProperty> {}
