import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCFD455CExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      ChipLibVersion: common.UInt8, // #3791
      FirstRegValue: common.UInt16, // #3793
      SecondRegValue: common.UInt16, // #3795
      ThirdRegValue: common.UInt16, // #3797
      FourthRegValue: common.UInt16, // #3799
      FifthRegValue: common.UInt16, // #3801
      LowGrayUniformityPromote: common.UInt8, // #3803
      ColumnBlankingStrengthAdjust: common.UInt8, // #3815
      ColumnBlankingEnhanceMode: common.Bool, // #3827
      CouplingStrengthAdjust: common.UInt8, // #3839
      OpenCheckPointAdjust: common.UInt8, // #3851
      CouplingOptimization: common.Bool, // #3863
      CouplingOptimizationMode: common.UInt8, // #3875
      CouplingRangeAdjust: common.UInt8, // #3887
      PreDriverEnable: common.Bool, // #3899
      OpenProtectEnable: common.Bool, // #3911
      ScanMode: common.UInt8, // #3923
      OpenSpeed: common.UInt8, // #3935
      CurrentGear: common.UInt8, // #3947
      LowGrayCompensationStrength: common.UInt8, // #3959
      OpenDynamicCheck: common.Bool, // #3971
      WakeUpSetting: common.UInt8, // #3983
      ConstantCurrentInflectionPointSetting: common.UInt8, // #3995
      DynamicEnergyConservation: common.Bool, // #4007
      ColumnBlankingDuration: common.UInt8, // #4019
      PreDriverMode: common.UInt8, // #4031
      PreDriverDurationSetting: common.UInt8, // #4043
      OpenCheckThresholdValue: common.UInt8, // #4055
      LowGrayScatterMode: common.UInt8, // #4067
      Delay: common.UInt8, // #4079
      DataOutputSetting: common.UInt8, // #4091
    }),
  ],
  'ChipCFD455CExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD455CExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD455C.decompiled.cs:3776
 */
export const ChipCFD455CExtendProperty = t.intersection(
  [
    ChipCFD455CExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD455CExtendProperty') }),
  ],
  'ChipCFD455CExtendProperty'
);
export interface ChipCFD455CExtendProperty extends t.TypeOf<typeof ChipCFD455CExtendProperty> {}
