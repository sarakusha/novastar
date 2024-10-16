import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipTBS2218ExtendProperty } from './ChipTBS2218ExtendProperty';
 // import
export const ChipTBS2218RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REGLENGTH: common.Int32_49, // #3672
      REGREMOVEBADPOINTSLENGTH: common.Int32_6, // #3674
      PWM_LUT_LENGTH: common.Int32_15, // #3915
      BitBase: common.UInt8_4,
    }),
    t.partial({
      RedProperty: ChipTBS2218ExtendProperty, // #3680
      GreenProperty: ChipTBS2218ExtendProperty, // #3683
      BlueProperty: ChipTBS2218ExtendProperty, // #3686
      VRedProperty: ChipTBS2218ExtendProperty, // #3689
      SpecialRegisterAddr: common.UInt32, // #3692
      IsUseNewModule: common.Bool, // #3694
      ChipLibVersion: common.UInt8, // #3696
      GrayPlus: common.Int32, // #3698
      ScanType: common.UInt8, // #3700
      RefNumPerVs: common.UInt8, // #3714
      Subfield: common.UInt8, // #3728
      SepTime: common.UInt8, // #3742
      ChnDegTime: common.UInt8, // #3756
      ChnPreDrv: common.UInt8, // #3770
      DisTime: common.UInt8, // #3784
      GclkFreqN: common.UInt8, // #3798
      GclkFreqM: common.UInt8, // #3812
      GclkFreqP: common.UInt8, // #3826
      GrayTime: common.UInt8, // #3840
      GrayDepth: common.UInt8, // #3860
      GrayDepthEx: common.UInt8, // #3875
      DummyTime: common.UInt8, // #3889
      PWMBitWidth: common.UInt8, // #3903
      PAMBitWidth: common.UInt8, // #3927
      MinPAM: common.UInt8, // #3930
      MaxPAM: common.UInt8, // #3942
      BitShift: common.UInt8, // #3954
      ScreenEnergySaving: common.UInt8, // #3966
      EnableOpenCircuitProtection: common.Bool, // #4024
      IsAdvancedMode: common.Bool, // #4036
      IsOpenHighLightEffectiveMode: common.Bool, // #4048
      MGEnable: common.Bool, // #4060
      MG: common.UInt8, // #4072
      GradualTransitionOptimization1: common.UInt8, // #4084
      CouplingOptimizationTwo: common.UInt16, // #4097
      TestGrade: common.UInt16, // #4109
      SpecialDataLen: common.Int32, // #4121
      GclkExpect: common.UInt8,
    }),
  ],
  'ChipTBS2218RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipTBS2218RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipTBS2218.decompiled.cs:3665
 */
export const ChipTBS2218RGBVExtendProperty = t.intersection(
  [
    ChipTBS2218RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTBS2218RGBVExtendProperty') }),
  ],
  'ChipTBS2218RGBVExtendProperty'
);
export interface ChipTBS2218RGBVExtendProperty
  extends t.TypeOf<typeof ChipTBS2218RGBVExtendProperty> {
  RedProperty?: ChipTBS2218ExtendProperty;
  GreenProperty?: ChipTBS2218ExtendProperty;
  BlueProperty?: ChipTBS2218ExtendProperty;
  VRedProperty?: ChipTBS2218ExtendProperty;
}
