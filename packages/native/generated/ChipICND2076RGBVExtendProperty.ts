import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipICND2076RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_12, // #54
      RegisterList: common.XMLArray(common.UInt64, 'ulong'), // #685
      RRemovePointCurrentAmplitude: common.UInt8_2, // #707
      GRemovePointCurrentAmplitude: common.UInt8_16, // #710
      BRemovePointCurrentAmplitude: common.UInt8_16,
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #63
      SpecialDataLen: common.Int32, // #65
      SpecialRegisterAddr: common.UInt32, // #67
      RShadowEliminationLevel: common.UInt8, // #69
      GShadowEliminationLevel: common.UInt8, // #81
      BShadowEliminationLevel: common.UInt8, // #93
      RShadowEliminationTime: common.UInt8, // #105
      GShadowEliminationTime: common.UInt8, // #117
      BShadowEliminationTime: common.UInt8, // #129
      LowAshuniformity: common.UInt8, // #141
      RLowGrayOffset: common.UInt8, // #153
      GLowGrayOffset: common.UInt8, // #165
      BLowGrayOffset: common.UInt8, // #177
      RFirstLineDarkCompsentionTime: common.UInt8, // #189
      GFirstLineDarkCompsentionTime: common.UInt8, // #201
      BFirstLineDarkCompsentionTime: common.UInt8, // #213
      RLowGrayFirstLineDarkCompsention: common.UInt8, // #225
      GLowGrayFirstLineDarkCompsention: common.UInt8, // #237
      BLowGrayFirstLineDarkCompsention: common.UInt8, // #249
      RLowGrayFirstLineDarkCompsentionFineTuning: common.UInt8, // #261
      GLowGrayFirstLineDarkCompsentionFineTuning: common.UInt8, // #273
      BLowGrayFirstLineDarkCompsentionFineTuning: common.UInt8, // #285
      RLowGrayFirstLineDarkCompsentionEn: common.Bool, // #297
      GLowGrayFirstLineDarkCompsentionEn: common.Bool, // #316
      BLowGrayFirstLineDarkCompsentionEn: common.Bool, // #335
      CouplingAdjustEnhacneModeEn: common.Bool, // #354
      CouplingOptimizationOne: common.UInt8, // #373
      RCouplingOptimizationTwoEn: common.Bool, // #385
      GCouplingOptimizationTwoEn: common.Bool, // #397
      BCouplingOptimizationTwoEn: common.Bool, // #409
      RCouplingOptimizationTwo: common.UInt8, // #421
      GCouplingOptimizationTwo: common.UInt8, // #433
      BCouplingOptimizationTwo: common.UInt8, // #445
      RSlowlyOpen: common.UInt8, // #457
      GSlowlyOpen: common.UInt8, // #469
      BSlowlyOpen: common.UInt8, // #481
      RKneePointVoltage: common.UInt8, // #493
      GKneePointVoltage: common.UInt8, // #505
      BKneePointVoltage: common.UInt8, // #517
      RCurrentGain: common.UInt8, // #529
      GCurrentGain: common.UInt8, // #541
      BCurrentGain: common.UInt8, // #553
      RCurrentAmplitude: common.UInt8, // #565
      GCurrentAmplitude: common.UInt8, // #577
      BCurrentAmplitude: common.UInt8, // #589
      IsAdvancedMode: common.Bool, // #601
      GclkNumPerScan: common.UInt8, // #620
      ScanCount: common.UInt8, // #637
      RefNumPerVs: common.UInt8, // #649
      GclkFreqP: common.UInt8, // #661
      GclkFreqM: common.UInt8, // #673
      GclkFreqN: common.UInt8, // #713
      FailureEliminationEn: common.Bool,
    }),
  ],
  'ChipICND2076RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2076RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2076.decompiled.cs:51
 */
export const ChipICND2076RGBVExtendProperty = t.intersection(
  [
    ChipICND2076RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2076RGBVExtendProperty') }),
  ],
  'ChipICND2076RGBVExtendProperty'
);
export interface ChipICND2076RGBVExtendProperty
  extends t.TypeOf<typeof ChipICND2076RGBVExtendProperty> {}
