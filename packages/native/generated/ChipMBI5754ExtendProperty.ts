import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5754ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_16, // #52
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      DarkBlockCompensationOne: common.UInt8, // #61
      DarkBlockCompensationTwo: common.UInt8, // #73
      DarkBlockCompensationThree: common.UInt8, // #85
      FirstSweepElimination: common.UInt8, // #97
      UnderEliminateGhost: common.UInt8, // #109
      GrayHorizontalStripesEliminateEn: common.Bool, // #121
      LowAshColorCastCompensation: common.UInt8, // #133
      AdvancedRLowAshColorCastCompensation1: common.UInt8, // #145
      AdvancedRLowAshColorCastCompensation2: common.UInt8, // #157
      AdvancedRLowAshColorCastCompensation3: common.UInt8, // #169
      GradientCompensation: common.UInt8, // #181
      GradientCompensation1: common.UInt8, // #193
      DislodgeBadPointsGrade: common.UInt8, // #205
      CurrentGain: common.UInt8,
    }),
  ],
  'ChipMBI5754ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5754ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5754.decompiled.cs:49
 */
export const ChipMBI5754ExtendProperty = t.intersection(
  [
    ChipMBI5754ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5754ExtendProperty') }),
  ],
  'ChipMBI5754ExtendProperty'
);
export interface ChipMBI5754ExtendProperty extends t.TypeOf<typeof ChipMBI5754ExtendProperty> {}
