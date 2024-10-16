import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCFD435AExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsUseNewModule: common.Bool, // #3780
      ChipLibVersion: common.UInt8, // #3782
      FirstRegValue: common.UInt16, // #3784
      SecondRegValue: common.UInt16, // #3786
      ThirdRegValue: common.UInt16, // #3788
      FourthRegValue: common.UInt16, // #3790
      LowAshEnhanceUniformity: common.UInt8, // #3792
      LineBlankStrength: common.UInt8, // #3804
      LineBlankEnhanceModeEn: common.Bool, // #3817
      CouplingStrengthAdjust: common.UInt8, // #3829
      OpenTestPointAdjust: common.UInt8, // #3841
      CouplingOptimizationEn: common.Bool, // #3853
      LowGrayCompsentionTimeSettingMode: common.UInt8, // #3865
      CouplingRangeAdjust: common.UInt8, // #3877
      PerDriverEnable: common.Bool, // #3889
      OpenProtectEnable: common.Bool, // #3901
      ScanMode: common.UInt8, // #3913
      CurrentGear: common.UInt8, // #3925
      LowGrayCompsentionStrength: common.UInt8, // #3937
      OpenDynamicTestEnable: common.Bool, // #3949
      CurrentCompsentionEnable: common.Bool, // #3961
      ConstantCurrentInflectionPoint: common.UInt8, // #3973
      DynamicEnergySavingEn: common.Bool, // #4001
      LineEliminationLength: common.UInt8, // #4013
      OutputResponse: common.UInt8, // #4025
      PerDriverMode: common.UInt8, // #4037
      PerDriverTimeSetting: common.UInt8, // #4049
      OpentestThresholdValue: common.UInt8, // #4061
      LowGrayGoodLevel: common.UInt8, // #4073
      SetWeakup: common.UInt8, // #4085
    }),
  ],
  'ChipCFD435AExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD435AExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD435A.decompiled.cs:3777
 */
export const ChipCFD435AExtendProperty = t.intersection(
  [
    ChipCFD435AExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD435AExtendProperty') }),
  ],
  'ChipCFD435AExtendProperty'
);
export interface ChipCFD435AExtendProperty extends t.TypeOf<typeof ChipCFD435AExtendProperty> {}
