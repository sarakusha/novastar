import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCFD555AExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsUseNewModule: common.Bool, // #4448
      ChipLibVersion: common.UInt8, // #4450
      FirstRegValue: common.UInt16, // #4452
      SecondRegValue: common.UInt16, // #4454
      ThirdRegValue: common.UInt16, // #4456
      FourthRegValue: common.UInt16, // #4458
      FifthRegValue: common.UInt16, // #4460
      SixthRegValue: common.UInt16, // #4462
      SeventhRegValue: common.UInt16, // #4464
      RefreshRate: common.UInt8, // #4466
      ScanNumSetting: common.UInt8, // #4478
      CurrentGain: common.UInt8, // #4490
      LowAshEnhanceUniformity: common.UInt8, // #4502
      LineBlankStrength: common.UInt8, // #4514
      OutputResponse: common.UInt8, // #4526
      PerDriverCycleNumSetting: common.UInt8, // #4538
      LineBlankEnhanceModeEn: common.Bool, // #4550
      CoupledOutputShift: common.UInt8, // #4562
      OpenTestPointAdjust: common.UInt8, // #4574
      CouplingOptimizationEn: common.Bool, // #4586
      LowGrayCompsentionTimeSettingMode: common.UInt8, // #4598
      CouplingRangeAdjust: common.UInt8, // #4610
      PerDriverEnable: common.Bool, // #4622
      PWMGraySetting: common.UInt8, // #4634
      OpenProtectEnable: common.Bool, // #4646
      ScanMode: common.UInt8, // #4658
      LowGrayPulseWidthCompensation: common.UInt8, // #4670
      PLLFreqDivision: common.UInt8, // #4682
      PLLFreqDoubling: common.UInt8, // #4694
      CurrentGear: common.UInt8, // #4706
      LowGrayCompsentionStrength: common.UInt8, // #4718
      OpenDynamicTestEnable: common.Bool, // #4730
      CurrentCompsentionEnable: common.Bool, // #4742
      ConstantCurrentInflectionPoint: common.UInt8, // #4754
      DynamicEnergySavingEn: common.Bool, // #4766
      LineEliminationLength: common.UInt8, // #4778
      PerDriverMode: common.UInt8, // #4790
      PerDriverTimeSetting: common.UInt8, // #4802
      OpentestThresholdValue: common.UInt8, // #4814
      CurrentCompsentionGear: common.UInt8, // #4826
      WakeUpSettings: common.UInt8, // #4838
    }),
  ],
  'ChipCFD555AExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD555AExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD555A.decompiled.cs:4445
 */
export const ChipCFD555AExtendProperty = t.intersection(
  [
    ChipCFD555AExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD555AExtendProperty') }),
  ],
  'ChipCFD555AExtendProperty'
);
export interface ChipCFD555AExtendProperty extends t.TypeOf<typeof ChipCFD555AExtendProperty> {}
