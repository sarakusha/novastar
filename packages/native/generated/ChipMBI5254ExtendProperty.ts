import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5254ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_14, // #1082
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      DarkBlockCompensationOne: common.UInt8, // #1091
      DarkBlockCompensationTwo: common.UInt8, // #1103
      DarkBlockCompensationThree: common.UInt8, // #1115
      FirstSweepElimination: common.UInt8, // #1127
      UnderEliminateGhost: common.UInt8, // #1139
      GrayHorizontalStripesEliminateEn: common.Bool, // #1151
      LowAshColorCastCompensation: common.UInt8, // #1163
      AdvancedRLowAshColorCastCompensation1: common.UInt8, // #1175
      AdvancedRLowAshColorCastCompensation2: common.UInt8, // #1187
      AdvancedRLowAshColorCastCompensation3: common.UInt8, // #1199
      GradientCompensation: common.UInt8, // #1211
      GradientCompensation1: common.UInt8, // #1223
      DislodgeBadPointsGrade: common.UInt8, // #1235
      CurrentGain: common.UInt8,
    }),
  ],
  'ChipMBI5254ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5254ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5254.decompiled.cs:1079
 */
export const ChipMBI5254ExtendProperty = t.intersection(
  [
    ChipMBI5254ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5254ExtendProperty') }),
  ],
  'ChipMBI5254ExtendProperty'
);
export interface ChipMBI5254ExtendProperty extends t.TypeOf<typeof ChipMBI5254ExtendProperty> {}
