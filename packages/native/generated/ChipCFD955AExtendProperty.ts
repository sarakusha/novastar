import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCFD955AExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsUseNewModule: common.Bool, // #3661
      ChipLibVersion: common.UInt8, // #3663
      FirstRegValue: common.UInt16, // #3665
      SecondRegValue: common.UInt16, // #3667
      ThirdRegValue: common.UInt16, // #3669
      FourthRegValue: common.UInt16, // #3671
      FifthRegValue: common.UInt16, // #3673
      SixthRegValue: common.UInt16, // #3675
      SeventhRegValue: common.UInt16, // #3677
      RefreshRate: common.UInt8, // #3679
      ScanNumSetting: common.UInt8, // #3691
      CurrentGain: common.UInt8, // #3703
      LowAshEnhanceUniformity: common.UInt8, // #3715
      LineBlankStrength: common.UInt8, // #3727
      OutputResponse: common.UInt8, // #3739
      PerDriverCycleNumSetting: common.UInt8, // #3751
      LineBlankEnhanceModeEn: common.Bool, // #3763
      CoupledOutputShift: common.UInt8, // #3775
      OpenTestPointAdjust: common.UInt8, // #3787
      CouplingOptimizationEn: common.Bool, // #3799
      LowGrayCompsentionTimeSettingMode: common.UInt8, // #3811
      CouplingRangeAdjust: common.UInt8, // #3823
      PerDriverEnable: common.Bool, // #3835
      PWMGraySetting: common.UInt8, // #3847
      OpenProtectEnable: common.Bool, // #3859
      ScanMode: common.UInt8, // #3871
      LowGrayPulseWidthCompensation: common.UInt8, // #3883
      PLLFreqDivision: common.UInt8, // #3895
      PLLFreqDoubling: common.UInt8, // #3907
      CurrentGear: common.UInt8, // #3919
      LowGrayCompsentionStrength: common.UInt8, // #3931
      OpenDynamicTestEnable: common.Bool, // #3943
      CurrentCompsentionEnable: common.Bool, // #3955
      ConstantCurrentInflectionPoint: common.UInt8, // #3967
      DynamicEnergySavingEn: common.Bool, // #3979
      LineEliminationLength: common.UInt8, // #3991
      PerDriverMode: common.UInt8, // #4003
      PerDriverTimeSetting: common.UInt8, // #4015
      OpentestThresholdValue: common.UInt8, // #4027
      CurrentCompsentionGear: common.UInt8, // #4039
      SRAMSelectClock: common.UInt8, // #4051
      WakeUpSettings: common.UInt8, // #4063
    }),
  ],
  'ChipCFD955AExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD955AExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD955A.decompiled.cs:3658
 */
export const ChipCFD955AExtendProperty = t.intersection(
  [
    ChipCFD955AExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD955AExtendProperty') }),
  ],
  'ChipCFD955AExtendProperty'
);
export interface ChipCFD955AExtendProperty extends t.TypeOf<typeof ChipCFD955AExtendProperty> {}
