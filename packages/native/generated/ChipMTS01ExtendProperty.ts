import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMTS01ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_7, // #2845
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      OpenTestLevel: common.UInt8, // #2850
      ShortTestLevel: common.UInt8, // #2862
      CurrentGain: common.UInt8, // #2874
      ImprovementPlanEn: common.Bool, // #2886
      FrontToBackEn: common.Bool, // #2902
      DischargeLevel: common.UInt8, // #2918
      PrechargeLevel: common.UInt8, // #2930
      FirstSweepEliminationEn: common.UInt8, // #2942
      FirstSweepEliminationPclk: common.UInt8, // #2959
      LowGrayTimePclk: common.UInt8, // #2971
      LowGrayTimePclkList: common.UInt8, // #2983
      GainElimination: common.UInt8,
    }),
  ],
  'ChipMTS01ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMTS01ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMTS01.decompiled.cs:2842
 */
export const ChipMTS01ExtendProperty = t.intersection(
  [ChipMTS01ExtendPropertyBase, t.partial({ '@_xsi:type': t.literal('ChipMTS01ExtendProperty') })],
  'ChipMTS01ExtendProperty'
);
export interface ChipMTS01ExtendProperty extends t.TypeOf<typeof ChipMTS01ExtendProperty> {}
