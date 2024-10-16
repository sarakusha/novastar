import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipTBS5266BExtendProperty } from './ChipTBS5266BExtendProperty';
 // import
export const ChipTBS5266BRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REGLENGTH: common.Int32_47, // #3838
      REGREMOVEBADPOINTSLENGTH: common.Int32_6, // #3840
      PWM_LUT_LENGTH: common.Int32_15, // #4135
      BitBase: common.UInt8_4,
    }),
    t.partial({
      RedProperty: ChipTBS5266BExtendProperty, // #3846
      GreenProperty: ChipTBS5266BExtendProperty, // #3849
      BlueProperty: ChipTBS5266BExtendProperty, // #3852
      VRedProperty: ChipTBS5266BExtendProperty, // #3855
      SpecialRegisterAddr: common.UInt32, // #3858
      IsUseNewModule: common.Bool, // #3860
      ChipLibVersion: common.UInt8, // #3862
      GrayPlus: common.Int32, // #3864
      ScanType: common.UInt8, // #3866
      RefNumPerVs: common.UInt8, // #3880
      Subfield: common.UInt8, // #3894
      RegFourteenBitFourteen: common.UInt8, // #3907
      RegZeroBitNineToEight: common.UInt8, // #3921
      SepTime: common.UInt8, // #3935
      ChnDegTime: common.UInt8, // #3949
      ChnPreDrv: common.UInt8, // #3963
      DisTime: common.UInt8, // #3977
      GclkFreqN: common.UInt8, // #3991
      GclkFreqM: common.UInt8, // #4005
      GclkFreqDIV: common.UInt8, // #4019
      GrayDepth: common.UInt8, // #4052
      DummyTime: common.UInt8, // #4067
      LowPowerMode: common.UInt8, // #4081
      PWMBitWidth: common.UInt8, // #4133
      PAMBitWidth: common.UInt8, // #4137
      MinPAM: common.UInt8, // #4140
      MaxPAM: common.UInt8, // #4152
      BitShift: common.UInt8, // #4164
      EnableOpenCircuitProtection: common.Bool, // #4176
      EnableShortCircuitProtection: common.Bool, // #4188
      IsAdvancedMode: common.Bool, // #4200
      IsOpenHighLightEffectiveMode: common.Bool, // #4212
      MGEnable: common.Bool, // #4224
      MG: common.UInt8, // #4236
      TestGrade: common.UInt16, // #4248
      SpecialDataLen: common.Int32, // #4260
      GradualTransitionOptimization1: common.UInt8,
    }),
  ],
  'ChipTBS5266BRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipTBS5266BRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipTBS5266B.decompiled.cs:3835
 */
export const ChipTBS5266BRGBVExtendProperty = t.intersection(
  [
    ChipTBS5266BRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTBS5266BRGBVExtendProperty') }),
  ],
  'ChipTBS5266BRGBVExtendProperty'
);
export interface ChipTBS5266BRGBVExtendProperty
  extends t.TypeOf<typeof ChipTBS5266BRGBVExtendProperty> {
  RedProperty?: ChipTBS5266BExtendProperty;
  GreenProperty?: ChipTBS5266BExtendProperty;
  BlueProperty?: ChipTBS5266BExtendProperty;
  VRedProperty?: ChipTBS5266BExtendProperty;
}
