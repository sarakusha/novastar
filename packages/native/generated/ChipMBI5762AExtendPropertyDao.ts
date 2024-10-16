import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5762AExtendPropertyDaoBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegValue: common.XMLArray(common.UInt16, 'ushort'), // #3673
      RegValue100: common.XMLArray(common.UInt16, 'ushort'), // #3676
      RegValue300: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #3660
      ChipLibVersion: common.UInt8, // #3679
      DarkBlockCompensationOneR: common.UInt8, // #3682
      DarkBlockCompensationOneG: common.UInt8, // #3696
      DarkBlockCompensationOneB: common.UInt8, // #3710
      DarkBlockCompensationTwoR: common.UInt8, // #3724
      DarkBlockCompensationTwoG: common.UInt8, // #3738
      DarkBlockCompensationTwoB: common.UInt8, // #3752
      DarkBlockCompensationThreeR: common.UInt8, // #3766
      DarkBlockCompensationThreeG: common.UInt8, // #3780
      DarkBlockCompensationThreeB: common.UInt8, // #3794
      AdvanceHighContrastCompensationR: common.UInt16, // #3808
      AdvanceHighContrastCompensationG: common.UInt16, // #3822
      AdvanceHighContrastCompensationB: common.UInt16, // #3836
      TheFirstScanDarkEliminateR: common.UInt8, // #3850
      TheFirstScanDarkEliminateG: common.UInt8, // #3864
      TheFirstScanDarkEliminateB: common.UInt8, // #3878
      LowGrayColorCompensationOneR: common.UInt8, // #3892
      LowGrayColorCompensationOneG: common.UInt8, // #3906
      LowGrayColorCompensationOneB: common.UInt8, // #3920
      LowGrayColorCompensationTwoR: common.UInt8, // #3934
      LowGrayColorCompensationTwoG: common.UInt8, // #3948
      LowGrayColorCompensationTwoB: common.UInt8, // #3962
      AdvanceHighContrastCompensationTwoR: common.UInt8, // #3976
      AdvanceHighContrastCompensationTwoG: common.UInt8, // #3990
      AdvanceHighContrastCompensationTwoB: common.UInt8, // #4004
      AdvanceLowGrayscaleUniformityOptimizationOneR: common.UInt8, // #4018
      AdvanceLowGrayscaleUniformityOptimizationOneG: common.UInt8, // #4032
      AdvanceLowGrayscaleUniformityOptimizationOneB: common.UInt8, // #4046
      AdvanceLowGrayscaleUniformityOptimizationTwoR: common.UInt8, // #4060
      AdvanceLowGrayscaleUniformityOptimizationTwoG: common.UInt8, // #4074
      AdvanceLowGrayscaleUniformityOptimizationTwoB: common.UInt8, // #4088
      GhostEliminateR: common.UInt8, // #4102
      GhostEliminateG: common.UInt8, // #4116
      GhostEliminateB: common.UInt8, // #4130
      HighGrayMissTimeTwoR: common.UInt8, // #4144
      HighGrayMissTimeTwoG: common.UInt8, // #4158
      HighGrayMissTimeTwoB: common.UInt8, // #4172
      OpenCircuitErrorDetectionVoltageLevelR: common.UInt8, // #4186
      OpenCircuitErrorDetectionVoltageLevelG: common.UInt8, // #4200
      OpenCircuitErrorDetectionVoltageLevelB: common.UInt8, // #4214
      CurrentGainR: common.UInt8, // #4228
      CurrentGainG: common.UInt8, // #4242
      CurrentGainB: common.UInt8,
    }),
  ],
  'ChipMBI5762AExtendPropertyDaoBase'
);
/**
 * Codec for {@link ChipMBI5762AExtendPropertyDao}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5762C.decompiled.cs:3657
 */
export const ChipMBI5762AExtendPropertyDao = t.intersection(
  [
    ChipMBI5762AExtendPropertyDaoBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5762AExtendPropertyDao') }),
  ],
  'ChipMBI5762AExtendPropertyDao'
);
export interface ChipMBI5762AExtendPropertyDao
  extends t.TypeOf<typeof ChipMBI5762AExtendPropertyDao> {}
