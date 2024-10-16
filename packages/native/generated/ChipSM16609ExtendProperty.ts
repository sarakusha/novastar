import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSM16609ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REGLENTH: common.Int32_42, // #3020
      RegValue: common.XMLArray(common.UInt16, 'ushort'), // #3022
      REMOVEBADPOINTSREGLENGTH: common.Int32_6, // #3024
      RemoveBadPointsRegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #3028
      ChipLibVersion: common.UInt8, // #3030
      BlankingOneLevel: common.UInt8, // #3032
      BlankingTwoLevelEnable: common.Bool, // #3044
      BlankingTwoLevel: common.UInt8, // #3056
      BlankingTwoTime: common.UInt8, // #3068
      BlankingThreeLevelEnable: common.Bool, // #3080
      BlankingThreeLevel: common.UInt8, // #3092
      TheFistScanDarkCompensationLevel: common.UInt8, // #3104
      TheFistScanDarkCompensationTime: common.UInt8, // #3116
      LowGrayCompensationOne: common.UInt8, // #3128
      LowGrayCompensationTwo: common.UInt8, // #3140
      LowGrayTransverseStriationImprove: common.UInt8, // #3152
      CouplingEnhanceMode: common.Bool, // #3164
      CouplingLevel: common.UInt8, // #3176
      CouplingOptimizationOne: common.UInt8, // #3188
      CouplingOptimizationTwo: common.UInt16, // #3200
      CouplingOptimizationThreeEnable: common.Bool, // #3213
      CouplingOptimizationThree: common.UInt8, // #3225
      CouplingOptimizationFour: common.Bool, // #3237
      EliminateOpenCircuitCrossLevel: common.UInt8, // #3249
      CurrentGain: common.UInt8,
    }),
  ],
  'ChipSM16609ExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16609ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16609.decompiled.cs:3017
 */
export const ChipSM16609ExtendProperty = t.intersection(
  [
    ChipSM16609ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16609ExtendProperty') }),
  ],
  'ChipSM16609ExtendProperty'
);
export interface ChipSM16609ExtendProperty extends t.TypeOf<typeof ChipSM16609ExtendProperty> {}
