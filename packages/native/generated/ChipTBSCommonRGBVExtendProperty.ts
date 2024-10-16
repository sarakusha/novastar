import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipTBSCommonExtendProperty } from './ChipTBSCommonExtendProperty';
 // import
export const ChipTBSCommonRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REGLENGTH: common.Int32_128, // #3977
      REGREMOVEBADPOINTSLENGTH: common.Int32_6, // #3979
      PWM_LUT_LENGTH: common.Int32_15, // #4238
      BitBase: common.UInt8_4,
    }),
    t.partial({
      RedProperty: ChipTBSCommonExtendProperty, // #3985
      GreenProperty: ChipTBSCommonExtendProperty, // #3988
      BlueProperty: ChipTBSCommonExtendProperty, // #3991
      VRedProperty: ChipTBSCommonExtendProperty, // #3994
      SpecialRegisterAddr: common.UInt32, // #3997
      IsUseNewModule: common.Bool, // #3999
      ChipLibVersion: common.UInt8, // #4001
      GrayPlus: common.Int32, // #4003
      ScanType: common.UInt8, // #4005
      RefNumPerVs: common.UInt8, // #4019
      Subfield: common.UInt8, // #4033
      RegFourteenBitFourteen: common.UInt8, // #4046
      RegZeroBitNineToEight: common.UInt8, // #4058
      SepTime: common.UInt8, // #4070
      ChnDegTime: common.UInt8, // #4084
      ChnPreDrv: common.UInt8, // #4098
      DisTime: common.UInt8, // #4112
      GclkFreqN: common.UInt8, // #4126
      GclkFreqM: common.UInt8, // #4138
      GclkFreqDIV: common.UInt8, // #4150
      GrayDepth: common.UInt8, // #4173
      DummyTime: common.UInt8, // #4186
      LowPowerMode: common.Bool, // #4200
      NormalMode: common.Bool, // #4218
      PWMBitWidth: common.UInt8, // #4236
      PAMBitWidth: common.UInt8, // #4240
      MinPAM: common.UInt8, // #4243
      MaxPAM: common.UInt8, // #4255
      BitShift: common.UInt8, // #4267
      EnableOpenCircuitProtection: common.Bool, // #4279
      EnableShortCircuitProtection: common.Bool, // #4291
      IsAdvancedMode: common.Bool, // #4303
      IsOpenHighLightEffectiveMode: common.Bool, // #4315
      MGEnable: common.Bool, // #4327
      MG: common.UInt8, // #4339
      TestGrade: common.UInt16, // #4351
      SpecialDataLen: common.Int32, // #4363
      GradualTransitionOptimization1: common.UInt8,
    }),
  ],
  'ChipTBSCommonRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipTBSCommonRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipTBS5266Common.decompiled.cs:3974
 */
export const ChipTBSCommonRGBVExtendProperty = t.intersection(
  [
    ChipTBSCommonRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTBSCommonRGBVExtendProperty') }),
  ],
  'ChipTBSCommonRGBVExtendProperty'
);
export interface ChipTBSCommonRGBVExtendProperty
  extends t.TypeOf<typeof ChipTBSCommonRGBVExtendProperty> {
  RedProperty?: ChipTBSCommonExtendProperty;
  GreenProperty?: ChipTBSCommonExtendProperty;
  BlueProperty?: ChipTBSCommonExtendProperty;
  VRedProperty?: ChipTBSCommonExtendProperty;
}
