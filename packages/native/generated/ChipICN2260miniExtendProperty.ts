import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipICN2260miniExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_238, // #3448
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'), // #3450
      FirstRegArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      FirstRegValue: common.UInt16, // #3454
      LowGrayHomogeneity: common.UInt8, // #3456
      LowGrayCorrectionOpen: common.UInt8, // #3468
      LowGrayCorrectionMode: common.UInt8, // #3480
      BlankingLevR: common.UInt8, // #3492
      BlankingLevG: common.UInt8, // #3504
      BlankingLevB: common.UInt8, // #3516
      BlankingLev2R: common.UInt8, // #3528
      BlankingLev2G: common.UInt8, // #3540
      BlankingLev2B: common.UInt8, // #3552
      LowGrayWideR: common.UInt8, // #3564
      LowGrayWideG: common.UInt8, // #3577
      LowGrayWideB: common.UInt8, // #3590
      LowGrayOptimizeR: common.UInt8, // #3603
      LowGrayOptimizeG: common.UInt8, // #3615
      LowGrayOptimizeB: common.UInt8, // #3627
      LowGrayLev: common.UInt8, // #3639
      LowGrayLevR: common.UInt8, // #3651
      LowGrayLevG: common.UInt8, // #3676
      LowGrayLevB: common.UInt8, // #3701
      FirstLineDarkCompensationMode: common.UInt8, // #3726
      FirstLineDarkCompensationR: common.UInt8, // #3738
      FirstLineDarkCompensationG: common.UInt8, // #3761
      FirstLineDarkCompensationB: common.UInt8, // #3784
      FirstLineDarkCompensationTimeR: common.UInt8, // #3807
      FirstLineDarkCompensationTimeG: common.UInt8, // #3819
      FirstLineDarkCompensationTimeB: common.UInt8, // #3831
      CouplingOptimizationMAX: common.UInt8, // #3843
      CouplingOptimizationR: common.UInt8, // #3845
      CouplingOptimizationG: common.UInt8, // #3857
      CouplingOptimizationB: common.UInt8, // #3869
      CouplingOptimizationENR: common.Bool, // #3881
      CouplingOptimizationENG: common.Bool, // #3893
      CouplingOptimizationENB: common.Bool, // #3905
      CouplingOptimizationTimeR: common.UInt8, // #3917
      CouplingOptimizationTimeG: common.UInt8, // #3929
      CouplingOptimizationTimeB: common.UInt8, // #3941
      LineBlankLevel: common.UInt8, // #3953
      BlackEconmic: common.Bool, // #3965
      SleepMode: common.Bool, // #3978
      IREFR: common.UInt8, // #3992
      LgainR: common.UInt8, // #4004
      Color_adjR: common.UInt8, // #4016
      IREFG: common.UInt8, // #4028
      LgainG: common.UInt8, // #4040
      Color_adjG: common.UInt8, // #4052
      IREFB: common.UInt8, // #4064
      LgainB: common.UInt8, // #4076
      Color_adjB: common.UInt8, // #4088
      RemoveBadEn: common.Bool, // #4100
      LevelTenR: common.UInt8, // #4114
      LevelTenG: common.UInt8, // #4126
      LevelTenB: common.UInt8, // #4138
      FreamIntervalEn: common.Bool, // #4150
      FreamInterval: common.UInt8, // #4162
      Agent: common.UInt8, // #4174
      LowGary: common.UInt8, // #4186
      Line_len: common.UInt8, // #4198
      Line_len2: common.UInt8, // #4210
      ScanNumIC1: common.UInt8, // #4222
      ScanNumIC2: common.UInt8, // #4234
      ExtendMode: common.Bool,
    }),
  ],
  'ChipICN2260miniExtendPropertyBase'
);
/**
 * Codec for {@link ChipICN2260miniExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICDD2260mini.decompiled.cs:3445
 */
export const ChipICN2260miniExtendProperty = t.intersection(
  [
    ChipICN2260miniExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICN2260miniExtendProperty') }),
  ],
  'ChipICN2260miniExtendProperty'
);
export interface ChipICN2260miniExtendProperty
  extends t.TypeOf<typeof ChipICN2260miniExtendProperty> {}
