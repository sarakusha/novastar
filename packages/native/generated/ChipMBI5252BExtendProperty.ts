import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5252BExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_14, // #1145
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      DarkBlockCompensationOne: common.UInt8, // #1150
      DarkBlockCompensationTwo: common.UInt8, // #1162
      DarkBlockCompensationThree: common.UInt8, // #1174
      FirstSweepElimination: common.UInt8, // #1186
      UnderEliminateGhost: common.UInt8, // #1198
      GrayHorizontalStripesEliminateEn: common.Bool, // #1210
      LowAshColorCastCompensation: common.UInt8, // #1222
      AdvancedRLowAshColorCastCompensation1: common.UInt8, // #1234
      AdvancedRLowAshColorCastCompensation2: common.UInt8, // #1246
      AdvancedRLowAshColorCastCompensation3: common.UInt8, // #1258
      GradientCompensation: common.UInt8, // #1270
      GradientCompensation1: common.UInt8, // #1282
      DislodgeBadPointsGrade: common.UInt8, // #1294
      CurrentGain: common.UInt8,
    }),
  ],
  'ChipMBI5252BExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5252BExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5252B.decompiled.cs:1142
 */
export const ChipMBI5252BExtendProperty = t.intersection(
  [
    ChipMBI5252BExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5252BExtendProperty') }),
  ],
  'ChipMBI5252BExtendProperty'
);
export interface ChipMBI5252BExtendProperty extends t.TypeOf<typeof ChipMBI5252BExtendProperty> {}
