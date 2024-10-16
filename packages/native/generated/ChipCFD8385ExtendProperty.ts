import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCFD8385ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsUseNewModule: common.Bool, // #3249
      ChipLibVersion: common.UInt8, // #3251
      FirstRegValue: common.UInt16, // #3253
      SecondRegValue: common.UInt16, // #3255
      ThirdRegValue: common.UInt16, // #3257
      FourthRegValue: common.UInt16, // #3259
      FifthRegValue: common.UInt16, // #3261
      SixthRegValue: common.UInt16, // #3263
      LowAshEnhanceUniformity: common.UInt8, // #3265
      SubField: common.UInt8, // #3277
      CurrentGain: common.UInt8, // #3289
      WrapBlankGrade: common.UInt8, // #3301
      CoupBlankGrade: common.UInt8, // #3313
      LineBlankrange: common.UInt8, // #3325
      OpenProtectEnable: common.Int32, // #3337
      OpenCircuitDetectionSuspends: common.Int32, // #3349
      CurrentGear: common.UInt8, // #3361
      ConstantCurrentInflectionPoint: common.UInt8, // #3373
      OpentestVoltage: common.UInt8, // #3385
      CouplingOptimizationMode: common.Int32, // #3397
      CouplingOptimizationStrength: common.UInt8, // #3409
      LowGrayCompsentionTime: common.Int32, // #3421
      LowGrayCompsentionStrength: common.Int32, // #3433
      CouplingOptimizationTime: common.Int32, // #3445
      DynamicEnergySavingEn: common.Bool, // #3457
      ScanMode: common.Bool, // #3469
      CouplingOptimizationEn: common.UInt8, // #3485
      CompsentionSetting: common.UInt8, // #3497
      CouplingBlankMode: common.Int32, // #3509
      LineFeedBlankMode: common.Int32, // #3521
      GrayStrength: common.Bool, // #3533
    }),
  ],
  'ChipCFD8385ExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD8385ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD8385.decompiled.cs:3246
 */
export const ChipCFD8385ExtendProperty = t.intersection(
  [
    ChipCFD8385ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD8385ExtendProperty') }),
  ],
  'ChipCFD8385ExtendProperty'
);
export interface ChipCFD8385ExtendProperty extends t.TypeOf<typeof ChipCFD8385ExtendProperty> {}
