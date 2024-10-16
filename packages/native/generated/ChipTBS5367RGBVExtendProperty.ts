import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipTBS5367RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      FourtyBitProperty: common.XMLArray(common.UInt64, 'ulong'), // #5208
      IsAdvancedMode: common.Bool_true,
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #4423
      ChipLibVersion: common.UInt8, // #4425
      SpecialDataLen: common.Int32, // #4427
      SpecialRegisterAddr: common.UInt32, // #4429
      BlankingOneLevelR: common.UInt8, // #4431
      BlankingOneLevelG: common.UInt8, // #4443
      BlankingOneLevelB: common.UInt8, // #4455
      BlankingTwoTime: common.UInt8, // #4467
      HiddenOptimizationOneR: common.UInt8, // #4479
      HiddenOptimizationOneG: common.UInt8, // #4491
      HiddenOptimizationOneB: common.UInt8, // #4503
      HiddenOptimizationTwoR: common.Bool, // #4515
      HiddenOptimizationTwoG: common.Bool, // #4527
      HiddenOptimizationTwoB: common.Bool, // #4539
      LowGrayCompensationOneR: common.UInt8, // #4551
      LowGrayCompensationOneG: common.UInt8, // #4563
      LowGrayCompensationOneB: common.UInt8, // #4575
      LowGrayCompensationTwoR: common.UInt8, // #4587
      LowGrayCompensationTwoG: common.UInt8, // #4599
      LowGrayCompensationTwoB: common.UInt8, // #4611
      LowgrayDeviationCompensation3R: common.UInt8, // #4623
      LowgrayDeviationCompensation3G: common.UInt8, // #4635
      LowgrayDeviationCompensation3B: common.UInt8, // #4647
      LowgrayBrightCompensationTime: common.UInt8, // #4659
      LowgrayBrightCompensation1R: common.UInt8, // #4671
      LowgrayBrightCompensation1G: common.UInt8, // #4683
      LowgrayBrightCompensation1B: common.UInt8, // #4695
      GradualTransitionOptimization1: common.UInt8, // #4707
      GradualTransitionOptimization2R: common.UInt8, // #4719
      GradualTransitionOptimization2G: common.UInt8, // #4731
      GradualTransitionOptimization2B: common.UInt8, // #4743
      GradualTransitionOptimization3R: common.UInt8, // #4755
      GradualTransitionOptimization3G: common.UInt8, // #4767
      GradualTransitionOptimization3B: common.UInt8, // #4779
      CouplingOptimizationOneR: common.UInt8, // #4791
      CouplingOptimizationOneG: common.UInt8, // #4803
      CouplingOptimizationOneB: common.UInt8, // #4815
      CouplingOptimizationTwoR: common.UInt8, // #4827
      CouplingOptimizationTwoG: common.UInt8, // #4839
      CouplingOptimizationTwoB: common.UInt8, // #4851
      CouplingOptimizationModeR: common.UInt8, // #4863
      CouplingOptimizationModeG: common.UInt8, // #4875
      CouplingOptimizationModeB: common.UInt8, // #4887
      KneeVoltageR: common.UInt8, // #4899
      KneeVoltageG: common.UInt8, // #4911
      KneeVoltageB: common.UInt8, // #4923
      CurrentGearR: common.UInt8, // #4935
      CurrentGearG: common.UInt8, // #4947
      CurrentGearB: common.UInt8, // #4959
      CurrentGainR: common.UInt8, // #4971
      CurrentGainG: common.UInt8, // #4983
      CurrentGainB: common.UInt8, // #4995
      OpenDetectionVoltageR: common.UInt8, // #5088
      OpenDetectionVoltageG: common.UInt8, // #5100
      OpenDetectionVoltageB: common.UInt8, // #5112
      ShutdownDetectionVoltage: common.UInt8, // #5124
      ScanMode: common.UInt8, // #5136
      RowBlankingEnhancement: common.Bool, // #5148
      CompensationEnabled: common.Bool, // #5160
      RowBlankingVolToThirtyOne: common.UInt8, // #5172
      RowBlankingVolToFifteen: common.UInt8, // #5184
      RowBlankingTime: common.UInt8, // #5196
      ScanGapTime: common.UInt8, // #5220
      TestGrade: common.UInt16, // #5223
      IsGrayClockCalcByDclk: common.UInt8, // #5225
      ScreenEnergySaving: common.UInt8, // #5237
      EnableOpenCircuitProtection: common.Bool, // #5280
      EnableShutdownCircuitProtection: common.Bool, // #5292
      PartNumPerRef: common.UInt8, // #5362
      RefNumPerVs: common.UInt8, // #5374
      GrayDepth: common.UInt8, // #5386
      GclkFreqN: common.UInt8, // #5398
      GclkFreqM: common.UInt8, // #5410
      GclkFreqP: common.UInt8, // #5422
      RegThreeFifteenToEight: common.UInt8, // #5434
      RegFourTwentyThreeToSixteen: common.UInt8, // #5446
      RegFourThirtyOneToTwentyFour: common.UInt8, // #5458
      RegFourFourtyOneToThirtyFour: common.UInt8, // #5470
      RegTwoTwentySixToSixteen: common.UInt16, // #5482
      RegOneTwentyThreeToTwentyTwo: common.UInt8, // #5494
      RegTwoTwentySixToTwentyThree: common.UInt8, // #5506
      GrayClockActualWithDivFreq: common.UInt8,
    }),
  ],
  'ChipTBS5367RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipTBS5367RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipTBS3268.decompiled.cs:4413
 */
export const ChipTBS5367RGBVExtendProperty = t.intersection(
  [
    ChipTBS5367RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTBS5367RGBVExtendProperty') }),
  ],
  'ChipTBS5367RGBVExtendProperty'
);
export interface ChipTBS5367RGBVExtendProperty
  extends t.TypeOf<typeof ChipTBS5367RGBVExtendProperty> {}
