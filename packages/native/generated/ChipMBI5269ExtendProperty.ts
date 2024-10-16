import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5269ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_21, // #4015
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      DarkBlockCompensationOneEn: common.Bool, // #4020
      DarkBlockCompensationOne: common.UInt8, // #4032
      DarkBlockCompensationTwo: common.UInt8, // #4044
      DarkBlockCompensationThree: common.UInt8, // #4056
      FirstSweepEliminationEn: common.Bool, // #4068
      FirstSweepElimination: common.UInt8, // #4080
      UnderEliminateGhost: common.UInt8, // #4092
      GrayHorizontalStripesEliminateEn: common.Bool, // #4104
      LowAshColorCastCompensationMode: common.UInt8, // #4116
      LowAshColorCastCompensation: common.UInt8, // #4128
      AdvancedRLowAshColorCastCompensation1: common.UInt8, // #4140
      AdvancedRLowAshColorCastCompensation3: common.UInt8, // #4152
      LowAshUniformityImproved1: common.UInt8, // #4164
      LowAshUniformityImproved2: common.UInt8, // #4177
      DislodgeBadPointsGrade: common.UInt8, // #4189
      CurrentGain: common.UInt8,
    }),
  ],
  'ChipMBI5269ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5269ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5269.decompiled.cs:4012
 */
export const ChipMBI5269ExtendProperty = t.intersection(
  [
    ChipMBI5269ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5269ExtendProperty') }),
  ],
  'ChipMBI5269ExtendProperty'
);
export interface ChipMBI5269ExtendProperty extends t.TypeOf<typeof ChipMBI5269ExtendProperty> {}
