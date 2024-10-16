import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5864ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_12, // #49
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      DarkBlockCompensationOne: common.UInt8, // #53
      DarkBlockCompensationTwo: common.UInt8, // #65
      DarkBlockCompensationThree: common.UInt8, // #77
      FirstSweepElimination: common.UInt8, // #89
      UnderEliminateGhost: common.UInt8, // #101
      GrayHorizontalStripesEliminateEn: common.Bool, // #113
      LowAshColorCastCompensation: common.UInt8, // #125
      AdvancedRLowAshColorCastCompensation1: common.UInt8, // #137
      AdvancedRLowAshColorCastCompensation2: common.UInt8, // #149
      DislodgeBadPointsGrade: common.UInt8, // #161
      CurrentGain: common.UInt8,
    }),
  ],
  'ChipMBI5864ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5864ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5864.decompiled.cs:46
 */
export const ChipMBI5864ExtendProperty = t.intersection(
  [
    ChipMBI5864ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5864ExtendProperty') }),
  ],
  'ChipMBI5864ExtendProperty'
);
export interface ChipMBI5864ExtendProperty extends t.TypeOf<typeof ChipMBI5864ExtendProperty> {}
