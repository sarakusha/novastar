import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCS2066ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsUseNewModule: common.Bool, // #5954
      ChipLibVersion: common.UInt8, // #5956
      FirstRegValue: common.UInt16, // #5958
      SecondRegValue: common.UInt16, // #5960
      ThirdRegValue: common.UInt16, // #5962
      FourthRegValue: common.UInt16, // #5964
      FifthRegValue: common.UInt16, // #5966
      SixthRegValue: common.UInt16, // #5968
      SeventhRegValue: common.UInt16, // #5970
      RefreshRate: common.UInt8, // #5972
      ScanNumSetting: common.UInt8, // #5984
      CurrentGain: common.UInt8, // #5996
      LowAshEnhanceUniformity: common.UInt8, // #6008
      LineBlankStrength: common.UInt8, // #6020
      OutputResponse: common.UInt8, // #6032
      PerDriverCycleNumSetting: common.UInt8, // #6044
      LineBlankEnhanceModeEn: common.Bool, // #6056
      CoupledOutputShift: common.UInt8, // #6068
      OpenTestPointAdjust: common.UInt8, // #6080
      CouplingOptimizationEn: common.Bool, // #6092
      LowGrayCompsentionTimeSettingMode: common.UInt8, // #6104
      CouplingRangeAdjust: common.UInt8, // #6116
      PerDriverEnable: common.Bool, // #6128
      PWMGraySetting: common.UInt8, // #6140
      OpenProtectEnable: common.Bool, // #6152
      ScanMode: common.UInt8, // #6164
      LowGrayPulseWidthCompensation: common.UInt8, // #6176
      PLLFreqDivision: common.UInt8, // #6188
      PLLFreqDoubling: common.UInt8, // #6200
      CurrentGear: common.UInt8, // #6212
      LowGrayCompsentionStrength: common.UInt8, // #6224
      OpenDynamicTestEnable: common.Bool, // #6236
      CurrentCompsentionEnable: common.Bool, // #6248
      ConstantCurrentInflectionPoint: common.UInt8, // #6260
      DynamicEnergySavingEn: common.Bool, // #6272
      LineEliminationLength: common.UInt8, // #6284
      PerDriverMode: common.UInt8, // #6296
      PerDriverTimeSetting: common.UInt8, // #6308
      OpentestThresholdValue: common.UInt8, // #6320
      CurrentCompsentionGear: common.UInt8, // #6332
      WakeUpSettings: common.UInt8, // #6344
    }),
  ],
  'ChipCS2066ExtendPropertyBase'
);
/**
 * Codec for {@link ChipCS2066ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCS2066.decompiled.cs:5951
 */
export const ChipCS2066ExtendProperty = t.intersection(
  [
    ChipCS2066ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCS2066ExtendProperty') }),
  ],
  'ChipCS2066ExtendProperty'
);
export interface ChipCS2066ExtendProperty extends t.TypeOf<typeof ChipCS2066ExtendProperty> {}
