import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSM16289ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REGLENTH: common.Int32_35, // #3699
      RegValue: common.XMLArray(common.UInt16, 'ushort'), // #3701
      REMOVEBADPOINTSREGLENGTH: common.Int32_6, // #3703
      RemoveBadPointsRegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #3707
      ChipLibVersion: common.UInt8, // #3709
      BlankingOneLevel: common.UInt8, // #3711
      BlankingTwoLevelEnable: common.Bool, // #3723
      BlankingTwoLevel: common.UInt8, // #3735
      BlankingTwoTime: common.UInt8, // #3747
      TheFistScanDarkCompensationLevel: common.UInt8, // #3759
      TheFistScanDarkCompensationTime: common.UInt8, // #3771
      LowGrayCompensationOne: common.UInt8, // #3783
      LowGrayCompensationTwo: common.UInt8, // #3795
      LowGrayTransverseStriationImprove: common.UInt8, // #3807
      CouplingLevel: common.UInt8, // #3819
      CouplingOptimizationTime: common.UInt8, // #3831
      ShortCircuitColorDeviationEn: common.Bool, // #3843
      ShortCircuitColorDeviation: common.UInt8, // #3855
      CouplingOptimizationOneEnable: common.Bool, // #3867
      CouplingOptimizationOne: common.UInt8, // #3879
      CouplingOptimizationWay: common.UInt8, // #3891
      CrossBoardOptimizationOne: common.UInt16, // #3903
      CrossBoardOptimizationTwoEnable: common.Bool, // #3916
      CrossBoardOptimizationTwo: common.UInt16, // #3928
      CrossBoardOptimizationThreeEnable: common.Bool, // #3941
      CrossBoardOptimizationThree: common.UInt8, // #3953
      EliminateOpenCircuitCrossLevel: common.UInt8, // #3965
      CurrentGain: common.UInt8,
    }),
  ],
  'ChipSM16289ExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16289ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16289.decompiled.cs:3696
 */
export const ChipSM16289ExtendProperty = t.intersection(
  [
    ChipSM16289ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16289ExtendProperty') }),
  ],
  'ChipSM16289ExtendProperty'
);
export interface ChipSM16289ExtendProperty extends t.TypeOf<typeof ChipSM16289ExtendProperty> {}
