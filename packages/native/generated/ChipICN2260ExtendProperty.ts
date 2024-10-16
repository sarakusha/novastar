import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipICN2260ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_238, // #3726
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'), // #3728
      FirstRegArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      FirstRegValue: common.UInt16, // #3732
      LowGrayHomogeneity: common.UInt8, // #3734
      LowGrayCorrectionOpen: common.UInt8, // #3746
      LowGrayCorrectionMode: common.UInt8, // #3758
      BlankingLevR: common.UInt8, // #3770
      BlankingLevG: common.UInt8, // #3782
      BlankingLevB: common.UInt8, // #3794
      BlankingLev2R: common.UInt8, // #3806
      BlankingLev2G: common.UInt8, // #3818
      BlankingLev2B: common.UInt8, // #3830
      LowGrayWideR: common.UInt8, // #3842
      LowGrayWideG: common.UInt8, // #3855
      LowGrayWideB: common.UInt8, // #3868
      LowGrayOptimizeR: common.UInt8, // #3881
      LowGrayOptimizeG: common.UInt8, // #3893
      LowGrayOptimizeB: common.UInt8, // #3905
      LowGrayLev: common.UInt8, // #3917
      LowGrayLevR: common.UInt8, // #3929
      LowGrayLevG: common.UInt8, // #3954
      LowGrayLevB: common.UInt8, // #3979
      FirstLineDarkCompensationMode: common.UInt8, // #4004
      FirstLineDarkCompensationR: common.UInt8, // #4016
      FirstLineDarkCompensationG: common.UInt8, // #4039
      FirstLineDarkCompensationB: common.UInt8, // #4062
      FirstLineDarkCompensationTimeR: common.UInt8, // #4085
      FirstLineDarkCompensationTimeG: common.UInt8, // #4097
      FirstLineDarkCompensationTimeB: common.UInt8, // #4109
      CouplingOptimizationMAX: common.UInt8, // #4121
      CouplingOptimizationR: common.UInt8, // #4123
      CouplingOptimizationG: common.UInt8, // #4135
      CouplingOptimizationB: common.UInt8, // #4147
      CouplingOptimizationENR: common.Bool, // #4159
      CouplingOptimizationENG: common.Bool, // #4171
      CouplingOptimizationENB: common.Bool, // #4183
      CouplingOptimizationTimeR: common.UInt8, // #4195
      CouplingOptimizationTimeG: common.UInt8, // #4207
      CouplingOptimizationTimeB: common.UInt8, // #4219
      LineBlankLevel: common.UInt8, // #4231
      BlackEconmic: common.Bool, // #4243
      SleepMode: common.Bool, // #4256
      IREFR: common.UInt8, // #4270
      LgainR: common.UInt8, // #4282
      Color_adjR: common.UInt8, // #4294
      IREFG: common.UInt8, // #4306
      LgainG: common.UInt8, // #4318
      Color_adjG: common.UInt8, // #4330
      IREFB: common.UInt8, // #4342
      LgainB: common.UInt8, // #4354
      Color_adjB: common.UInt8, // #4366
      RemoveBadEn: common.Bool, // #4378
      LevelTenR: common.UInt8, // #4392
      LevelTenG: common.UInt8, // #4404
      LevelTenB: common.UInt8, // #4416
      FreamIntervalEn: common.Bool, // #4428
      FreamInterval: common.UInt8, // #4440
      Agent: common.UInt8, // #4452
      LowGary: common.UInt8, // #4464
      Line_len: common.UInt8, // #4476
      Line_len2: common.UInt8, // #4488
      ScanNumIC1: common.UInt8, // #4500
      ScanNumIC2: common.UInt8, // #4512
      ScanType: common.UInt8, // #4524
      ScanNum: common.UInt8, // #4534
      ExtendMode: common.Bool,
    }),
  ],
  'ChipICN2260ExtendPropertyBase'
);
/**
 * Codec for {@link ChipICN2260ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICN2260.decompiled.cs:3723
 */
export const ChipICN2260ExtendProperty = t.intersection(
  [
    ChipICN2260ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICN2260ExtendProperty') }),
  ],
  'ChipICN2260ExtendProperty'
);
export interface ChipICN2260ExtendProperty extends t.TypeOf<typeof ChipICN2260ExtendProperty> {}
