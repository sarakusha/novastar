import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipICND2270ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_256, // #3511
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'), // #3513
      FirstRegArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      FirstRegValue: common.UInt16, // #3517
      LowGrayHomogeneity: common.UInt8, // #3519
      BlankingLevR: common.UInt8, // #3531
      BlankingLevG: common.UInt8, // #3543
      BlankingLevB: common.UInt8, // #3555
      BlankingLev2R: common.UInt8, // #3567
      BlankingLev2G: common.UInt8, // #3579
      BlankingLev2B: common.UInt8, // #3591
      LowGrayWideR: common.UInt8, // #3603
      LowGrayWideG: common.UInt8, // #3616
      LowGrayWideB: common.UInt8, // #3629
      LowGrayOptimizeR: common.UInt8, // #3642
      LowGrayOptimizeG: common.UInt8, // #3654
      LowGrayOptimizeB: common.UInt8, // #3666
      LowGrayLev: common.UInt8, // #3678
      LowGrayLevR: common.UInt8, // #3690
      LowGrayLevG: common.UInt8, // #3715
      LowGrayLevB: common.UInt8, // #3740
      FirstLineDarkCompensationMode: common.UInt8, // #3765
      FirstLineDarkCompensationR: common.UInt8, // #3777
      FirstLineDarkCompensationG: common.UInt8, // #3800
      FirstLineDarkCompensationB: common.UInt8, // #3823
      FirstLineDarkCompensationTimeR: common.UInt8, // #3846
      FirstLineDarkCompensationTimeG: common.UInt8, // #3858
      FirstLineDarkCompensationTimeB: common.UInt8, // #3870
      CouplingOptimizationR: common.UInt8, // #3882
      CouplingOptimizationG: common.UInt8, // #3894
      CouplingOptimizationB: common.UInt8, // #3906
      CouplingOptimizationENR: common.Bool, // #3918
      CouplingOptimizationENG: common.Bool, // #3930
      CouplingOptimizationENB: common.Bool, // #3942
      CouplingOptimizationTimeR: common.UInt8, // #3954
      CouplingOptimizationTimeG: common.UInt8, // #3966
      CouplingOptimizationTimeB: common.UInt8, // #3978
      LineBlankLevel: common.UInt8, // #3990
      BlackEconmic: common.Bool, // #4002
      SleepMode: common.Bool, // #4015
      HighGrayMode: common.Bool, // #4027
      IREFR: common.UInt8, // #4039
      LgainR: common.UInt8, // #4051
      Color_adjR: common.UInt8, // #4063
      IREFG: common.UInt8, // #4075
      LgainG: common.UInt8, // #4087
      Color_adjG: common.UInt8, // #4099
      IREFB: common.UInt8, // #4111
      LgainB: common.UInt8, // #4123
      Color_adjB: common.UInt8, // #4135
      RemoveBadEn: common.Bool, // #4147
      RemoveBadEnMode: common.Bool, // #4160
      IntervalOptimization: common.UInt8, // #4172
      IntervalOptimizationEn: common.Bool, // #4184
      Agent: common.UInt8, // #4196
      AgentHigh: common.UInt8, // #4208
      LowGary: common.UInt8, // #4220
      LowGrayCorrectionOpen: common.UInt8, // #4260
      Line_len: common.UInt8, // #4272
      Line_len2: common.UInt8, // #4284
      ScanNumIC1: common.UInt8, // #4296
      ScanNumIC2: common.UInt8, // #4308
      ScanNumIC3: common.UInt8, // #4320
      ExtendMode: common.Bool,
    }),
  ],
  'ChipICND2270ExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2270ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICN2270.decompiled.cs:3508
 */
export const ChipICND2270ExtendProperty = t.intersection(
  [
    ChipICND2270ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2270ExtendProperty') }),
  ],
  'ChipICND2270ExtendProperty'
);
export interface ChipICND2270ExtendProperty extends t.TypeOf<typeof ChipICND2270ExtendProperty> {}
