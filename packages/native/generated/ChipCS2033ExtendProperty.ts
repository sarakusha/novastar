import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCS2033ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      FirstRegValue: common.withDefault(common.UInt16, 20480), // #2974
      SecondRegValue: common.withDefault(common.UInt16, 62093), // #2977
      ThirdRegValue: common.withDefault(common.UInt16, 7265), // #2980
      FourthRegValue: common.UInt16_0,
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #2970
      ChipLibVersion: common.UInt8, // #2983
      LowAshEnhanceUniformity: common.UInt8, // #2986
      LineBlankStrength: common.UInt8, // #2998
      LineBlankEnhanceModeEn: common.Bool, // #3011
      CouplingStrengthAdjust: common.UInt8, // #3023
      OpenTestPointAdjust: common.UInt8, // #3035
      CouplingOptimizationEn: common.Bool, // #3047
      LowGrayCompsentionTimeSettingMode: common.UInt8, // #3059
      CouplingRangeAdjust: common.UInt8, // #3071
      PerDriverEnable: common.Bool, // #3083
      OpenProtectEnable: common.Bool, // #3095
      ScanMode: common.UInt8, // #3107
      CurrentGear: common.UInt8, // #3119
      LowGrayCompsentionStrength: common.UInt8, // #3131
      OpenDynamicTestEnable: common.Bool, // #3143
      CurrentCompsentionEnable: common.Bool, // #3155
      ConstantCurrentInflectionPoint: common.UInt8, // #3167
      DynamicEnergySavingEn: common.Bool, // #3195
      LineEliminationLength: common.UInt8, // #3207
      OutputResponse: common.UInt8, // #3219
      PerDriverMode: common.UInt8, // #3231
      PerDriverTimeSetting: common.UInt8, // #3243
      OpentestThresholdValue: common.UInt8, // #3255
      CurrentCompsentionGear: common.UInt8,
    }),
  ],
  'ChipCS2033ExtendPropertyBase'
);
/**
 * Codec for {@link ChipCS2033ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCS2033.decompiled.cs:2967
 */
export const ChipCS2033ExtendProperty = t.intersection(
  [
    ChipCS2033ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCS2033ExtendProperty') }),
  ],
  'ChipCS2033ExtendProperty'
);
export interface ChipCS2033ExtendProperty extends t.TypeOf<typeof ChipCS2033ExtendProperty> {}
