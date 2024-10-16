import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipDP3263ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_7, // #3045
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      FirstRegValue: common.UInt16, // #3050
      SecondRegValue: common.UInt16, // #3052
      ConstantCurrentOutputInflectionPointGrade: common.UInt8, // #3054
      ErrConstantCurrentOutputInflectionPointGrade: common.UInt8, // #3066
      LowGreyPittingOptimization: common.UInt8, // #3078
      GammaSmoothingLevelCoarse: common.UInt8, // #3099
      GammaSmoothingLevelExquisite: common.UInt8, // #3111
      GammaSmoothingLevelCoarseEn: common.Bool, // #3123
      GammaSmoothingLevelExquisiteEn: common.Bool, // #3139
      ShadowEliminationLevelEnable: common.Bool, // #3155
      ShadowEliminationLevel: common.UInt8, // #3171
      CouplingOptimization: common.Bool, // #3183
      CouplingOptimizationLevelEn: common.Bool, // #3199
      CouplingOptimizationLevel: common.UInt8, // #3215
      CouplingCoefficient7_4: common.UInt8, // #3227
      CouplingCoefficient3_0: common.UInt8, // #3239
      FailureLEDElimination: common.Bool, // #3251
      CurrentGain: common.UInt16,
    }),
  ],
  'ChipDP3263ExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3263ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3263.decompiled.cs:3042
 */
export const ChipDP3263ExtendProperty = t.intersection(
  [
    ChipDP3263ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3263ExtendProperty') }),
  ],
  'ChipDP3263ExtendProperty'
);
export interface ChipDP3263ExtendProperty extends t.TypeOf<typeof ChipDP3263ExtendProperty> {}
