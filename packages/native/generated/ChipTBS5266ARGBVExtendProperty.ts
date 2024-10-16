import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipTBS5266AExtendProperty } from './ChipTBS5266AExtendProperty';
 // import
export const ChipTBS5266ARGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REGLENGTH: common.Int32_47, // #3886
      REGREMOVEBADPOINTSLENGTH: common.Int32_6, // #3888
      PWM_LUT_LENGTH: common.Int32_15, // #4164
      BitBase: common.UInt8_4,
    }),
    t.partial({
      RedProperty: ChipTBS5266AExtendProperty, // #3894
      GreenProperty: ChipTBS5266AExtendProperty, // #3897
      BlueProperty: ChipTBS5266AExtendProperty, // #3900
      VRedProperty: ChipTBS5266AExtendProperty, // #3903
      SpecialRegisterAddr: common.UInt32, // #3906
      IsUseNewModule: common.Bool, // #3908
      ChipLibVersion: common.UInt8, // #3910
      GrayPlus: common.Int32, // #3912
      ScanType: common.UInt8, // #3914
      RefNumPerVs: common.UInt8, // #3928
      Subfield: common.UInt8, // #3942
      RegFourteenBitFourteen: common.UInt8, // #3955
      RegZeroBitNineToEight: common.UInt8, // #3969
      SepTime: common.UInt8, // #3983
      ChnDegTime: common.UInt8, // #3997
      ChnPreDrv: common.UInt8, // #4011
      DisTime: common.UInt8, // #4025
      GclkFreqN: common.UInt8, // #4039
      GclkFreqM: common.UInt8, // #4053
      GclkFreqDIV: common.UInt8, // #4067
      GrayDepth: common.UInt8, // #4081
      DummyTime: common.UInt8, // #4096
      LowPowerMode: common.UInt8, // #4110
      PWMBitWidth: common.UInt8, // #4162
      PAMBitWidth: common.UInt8, // #4166
      MinPAM: common.UInt8, // #4169
      MaxPAM: common.UInt8, // #4181
      BitShift: common.UInt8, // #4193
      EnableOpenCircuitProtection: common.Bool, // #4205
      EnableShortCircuitProtection: common.Bool, // #4217
      IsAdvancedMode: common.Bool, // #4229
      IsOpenHighLightEffectiveMode: common.Bool, // #4241
      MGEnable: common.Bool, // #4253
      MG: common.UInt8, // #4265
      TestGrade: common.UInt16, // #4277
      GclkExpect: common.UInt8, // #4289
      SpecialDataLen: common.Int32, // #4301
      GradualTransitionOptimization1: common.UInt8,
    }),
  ],
  'ChipTBS5266ARGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipTBS5266ARGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipTBS5266A.decompiled.cs:3883
 */
export const ChipTBS5266ARGBVExtendProperty = t.intersection(
  [
    ChipTBS5266ARGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTBS5266ARGBVExtendProperty') }),
  ],
  'ChipTBS5266ARGBVExtendProperty'
);
export interface ChipTBS5266ARGBVExtendProperty
  extends t.TypeOf<typeof ChipTBS5266ARGBVExtendProperty> {
  RedProperty?: ChipTBS5266AExtendProperty;
  GreenProperty?: ChipTBS5266AExtendProperty;
  BlueProperty?: ChipTBS5266AExtendProperty;
  VRedProperty?: ChipTBS5266AExtendProperty;
}
