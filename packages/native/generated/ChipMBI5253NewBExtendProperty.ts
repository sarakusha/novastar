import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5253NewBExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_14, // #1117
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      DarkBlockCompensationOne: common.UInt8, // #1122
      DarkBlockCompensationTwo: common.UInt8, // #1134
      DarkBlockCompensationThree: common.UInt8, // #1146
      FirstSweepElimination: common.UInt8, // #1158
      UnderEliminateGhost: common.UInt8, // #1170
      GrayHorizontalStripesEliminateEn: common.Bool, // #1182
      LowAshColorCastCompensation: common.UInt8, // #1194
      AdvancedRLowAshColorCastCompensation1: common.UInt8, // #1206
      AdvancedRLowAshColorCastCompensation2: common.UInt8, // #1218
      AdvancedRLowAshColorCastCompensation3: common.UInt8, // #1230
      GradientCompensation: common.UInt8, // #1242
      GradientCompensation1: common.UInt8, // #1254
      DislodgeBadPointsGrade: common.UInt8, // #1266
      CurrentGain: common.UInt8,
    }),
  ],
  'ChipMBI5253NewBExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5253NewBExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5253NewB.decompiled.cs:1114
 */
export const ChipMBI5253NewBExtendProperty = t.intersection(
  [
    ChipMBI5253NewBExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5253NewBExtendProperty') }),
  ],
  'ChipMBI5253NewBExtendProperty'
);
export interface ChipMBI5253NewBExtendProperty
  extends t.TypeOf<typeof ChipMBI5253NewBExtendProperty> {}
