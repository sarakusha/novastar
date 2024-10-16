import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCFD465AExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      ChipLibVersion: common.UInt8, // #118
      FirstRegValue: common.UInt16, // #120
      SecondRegValue: common.UInt16, // #122
      ThirdRegValue: common.UInt16, // #124
      FourthRegValue: common.UInt16, // #126
      FifthRegValue: common.UInt16, // #128
      LowAshImport: common.UInt8, // #130
      ScanNumSetting: common.UInt8, // #142
      CurrentGain: common.UInt8, // #154
      LineBlankStrength: common.UInt8, // #166
      LineBlankStrengthModel: common.Bool, // #178
      CouplingStrengthAdjust: common.UInt8, // #194
      OpenTestPointAdjust: common.UInt8, // #206
      CouplingOptimizationEn: common.Bool, // #218
      CouplingOptimizationEnModel: common.UInt8, // #234
      CouplingRangeAdjust: common.UInt8, // #246
      PerDriverEnable: common.Bool, // #258
      SetGrayLevel: common.UInt8, // #274
      OpenProtectEnable: common.Bool, // #286
      ScanMode: common.UInt8, // #302
      DoubleEnableds: common.Bool, // #314
      OpenSpeed: common.UInt8, // #330
      CurrentGear: common.UInt8, // #342
      LowGrayCompsentionStrength: common.UInt8, // #354
      OpenDynamicTestEnable: common.Bool, // #366
      AwakeSetting: common.UInt8, // #382
      KneePointSetting: common.UInt8, // #394
      GCLKInsideDouble: common.Bool, // #406
      DynaEneagry: common.Bool, // #422
      LineBlankTimer: common.UInt8, // #438
      ChoiceRgb: common.UInt8, // #450
      KeepPlaceI: common.UInt8, // #462
      DriverModel: common.UInt8, // #474
      DriverModelTimer: common.UInt8, // #486
      OpenSave: common.UInt8, // #498
      KeepPlaceII: common.UInt8, // #510
      LowAshplay: common.UInt8, // #522
      DynaClock: common.Bool, // #534
      ChoiceRgbAB: common.UInt8, // #550
      LowAshPaySetting: common.UInt8, // #562
      Delay: common.UInt8, // #574
      SRAMSetting: common.UInt8, // #586
      PrintDataSetting: common.UInt8, // #598
      KeepPlaceIV: common.UInt8, // #610
    }),
  ],
  'ChipCFD465AExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD465AExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD456A.decompiled.cs:103
 */
export const ChipCFD465AExtendProperty = t.intersection(
  [
    ChipCFD465AExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD465AExtendProperty') }),
  ],
  'ChipCFD465AExtendProperty'
);
export interface ChipCFD465AExtendProperty extends t.TypeOf<typeof ChipCFD465AExtendProperty> {}
