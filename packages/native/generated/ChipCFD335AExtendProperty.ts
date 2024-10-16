import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCFD335AExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsUseNewModule: common.Bool, // #2942
      ChipLibVersion: common.UInt8, // #2944
      FirstRegValue: common.UInt16, // #2946
      SecondRegValue: common.UInt16, // #2948
      ThirdRegValue: common.UInt16, // #2950
      FourthRegValue: common.UInt16, // #2952
      LowAshEnhanceUniformity: common.UInt8, // #2954
      LineBlankStrength: common.UInt8, // #2966
      LineBlankEnhanceModeEn: common.Bool, // #2979
      CouplingStrengthAdjust: common.UInt8, // #2991
      OpenTestPointAdjust: common.UInt8, // #3003
      CouplingOptimizationEn: common.Bool, // #3015
      LowGrayCompsentionTimeSettingMode: common.UInt8, // #3027
      CouplingRangeAdjust: common.UInt8, // #3039
      PerDriverEnable: common.Bool, // #3051
      OpenProtectEnable: common.Bool, // #3063
      ScanMode: common.UInt8, // #3075
      CurrentGear: common.UInt8, // #3087
      LowGrayCompsentionStrength: common.UInt8, // #3099
      OpenDynamicTestEnable: common.Bool, // #3111
      CurrentCompsentionEnable: common.Bool, // #3123
      ConstantCurrentInflectionPoint: common.UInt8, // #3135
      DynamicEnergySavingEn: common.Bool, // #3163
      LineEliminationLength: common.UInt8, // #3175
      OutputResponse: common.UInt8, // #3187
      PerDriverMode: common.UInt8, // #3199
      PerDriverTimeSetting: common.UInt8, // #3211
      OpentestThresholdValue: common.UInt8, // #3223
      CurrentCompsentionGear: common.UInt8, // #3235
    }),
  ],
  'ChipCFD335AExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD335AExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD335A.decompiled.cs:2939
 */
export const ChipCFD335AExtendProperty = t.intersection(
  [
    ChipCFD335AExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD335AExtendProperty') }),
  ],
  'ChipCFD335AExtendProperty'
);
export interface ChipCFD335AExtendProperty extends t.TypeOf<typeof ChipCFD335AExtendProperty> {}
