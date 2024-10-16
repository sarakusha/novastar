import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCFD955BExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsUseNewModule: common.Bool, // #3276
      ChipLibVersion: common.UInt8, // #3278
      FirstRegValue: common.UInt16, // #3280
      SecondRegValue: common.UInt16, // #3282
      ThirdRegValue: common.UInt16, // #3284
      FourthRegValue: common.UInt16, // #3286
      FifthRegValue: common.UInt16, // #3288
      SixthRegValue: common.UInt16, // #3290
      LowAshEnhanceUniformity: common.UInt8, // #3292
      SubField: common.UInt8, // #3304
      CurrentGain: common.UInt8, // #3316
      WrapBlankGrade: common.UInt8, // #3328
      CoupBlankGrade: common.UInt8, // #3340
      LineBlankrange: common.UInt8, // #3352
      CoupBlankMode: common.UInt8, // #3364
      WrapBlankMode: common.UInt8, // #3376
      CurrentGear: common.UInt8, // #3388
      ConstantCurrentInflectionPoint: common.UInt8, // #3400
      OpentestVoltage: common.UInt8, // #3412
      PerDriverStrength: common.UInt8, // #3424
      PerDriverModeSet: common.UInt8, // #3436
      LowGrayCompsentionMode: common.Int32, // #3448
      LowGrayCompsentionStrength: common.UInt8, // #3461
      DynamicEnergySavingEn: common.Bool, // #3473
      WrapBlankStrengthMode: common.Bool, // #3485
      ScanMode: common.Bool, // #3501
      CouplingOptimizationEn: common.UInt8, // #3517
      CompsentionSetting: common.UInt8, // #3529
      GrayClkSelect: common.UInt8, // #3541
      BlankStrengthModeSet: common.UInt8, // #3553
      BlankStrengthGradeSet: common.UInt8, // #3565
      GrayStrength: common.Bool, // #3577
    }),
  ],
  'ChipCFD955BExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD955BExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD955B.decompiled.cs:3273
 */
export const ChipCFD955BExtendProperty = t.intersection(
  [
    ChipCFD955BExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD955BExtendProperty') }),
  ],
  'ChipCFD955BExtendProperty'
);
export interface ChipCFD955BExtendProperty extends t.TypeOf<typeof ChipCFD955BExtendProperty> {}
