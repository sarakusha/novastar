import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5268ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_16, // #4839
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      G: common.UInt8, // #4844
      DarkBlockCompensationOneEn: common.Bool, // #4857
      DarkBlockCompensationOne: common.UInt8, // #4869
      DarkBlockCompensationTwo: common.UInt8, // #4881
      DarkBlockCompensationThree: common.UInt8, // #4893
      FirstSweepEliminationEn: common.Bool, // #4905
      FirstSweepElimination: common.UInt8, // #4917
      UnderEliminateGhost: common.UInt8, // #4929
      GrayHorizontalStripesEliminateEn: common.Bool, // #4941
      LowAshColorCastCompensation: common.UInt8, // #4953
      AdvancedRLowAshColorCastCompensation1: common.UInt8, // #4965
      AdvancedRLowAshColorCastCompensation2: common.UInt8, // #4977
      AdvancedRLowAshColorCastCompensation3: common.UInt8, // #4989
      GradientCompensationEnable: common.Bool, // #5001
      LowAshUniformityImproved1: common.UInt8, // #5013
      LowAshUniformityImproved2: common.UInt8, // #5026
      DislodgeBadPointsGrade: common.UInt8, // #5038
      CurrentGain: common.UInt8, // #5050
      VrextVoltageEnable: common.Bool,
    }),
  ],
  'ChipMBI5268ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5268ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5268.decompiled.cs:4836
 */
export const ChipMBI5268ExtendProperty = t.intersection(
  [
    ChipMBI5268ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5268ExtendProperty') }),
  ],
  'ChipMBI5268ExtendProperty'
);
export interface ChipMBI5268ExtendProperty extends t.TypeOf<typeof ChipMBI5268ExtendProperty> {}
