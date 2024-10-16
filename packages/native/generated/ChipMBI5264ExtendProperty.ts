import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5264ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_16, // #5538
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      DarkBlockCompensationOne: common.UInt8, // #5547
      DarkBlockCompensationOneEn: common.Bool, // #5559
      DarkBlockCompensationTwo: common.UInt8, // #5571
      DarkBlockCompensationThree: common.UInt8, // #5583
      FirstSweepElimination: common.UInt8, // #5595
      FirstSweepEliminationEn: common.Bool, // #5607
      UnderEliminateGhost: common.UInt8, // #5619
      GrayHorizontalStripesEliminateEn: common.Bool, // #5631
      StaggeredChannels: common.UInt8, // #5643
      ChannelsStartSpeed: common.UInt8, // #5655
      ChannelsCloseSpeed: common.UInt8, // #5667
      KneeVoltage: common.UInt8, // #5679
      LowAshColorCastCompensation: common.UInt8, // #5691
      AdvancedRLowAshColorCastCompensation1: common.UInt8, // #5703
      AdvancedRLowAshColorCastCompensation2: common.UInt8, // #5715
      AdvancedRLowAshColorCastCompensation3: common.UInt8, // #5727
      GradientCompensationEnable: common.Bool, // #5739
      LowAshUniformityImproved1: common.UInt8, // #5751
      LowAshUniformityImproved2: common.UInt8, // #5764
      DislodgeBadPointsGrade: common.UInt8, // #5776
      CurrentGain: common.UInt8,
    }),
  ],
  'ChipMBI5264ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5264ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5264.decompiled.cs:5535
 */
export const ChipMBI5264ExtendProperty = t.intersection(
  [
    ChipMBI5264ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5264ExtendProperty') }),
  ],
  'ChipMBI5264ExtendProperty'
);
export interface ChipMBI5264ExtendProperty extends t.TypeOf<typeof ChipMBI5264ExtendProperty> {}
