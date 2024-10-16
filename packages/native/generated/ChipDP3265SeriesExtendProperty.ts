import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipDP3265SeriesExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #4974
      ChipLibVersion: common.UInt8, // #4976
      EliminateShadowMoment: common.UInt8, // #4978
      EliminateShadowTime: common.UInt8, // #4990
      CouplingOptimizationCoefficient: t.string, // #5002
      GammaSmooth: common.UInt8, // #5015
      CurrentGain: common.UInt16, // #5027
      CouplingOptimizationOne: common.UInt8, // #5039
      CouplingOptimizationEnhance: common.Bool, // #5051
      EliminateShadowLevelEnable: common.Bool, // #5063
      CouplingOptimizationEnable: common.Bool, // #5075
      LowGrayPittingOptimization: common.UInt8, // #5087
      LowGrayDisplayEffectEnhance: common.Bool, // #5099
      ConstantCurrentOutputInflectPointLevel: common.UInt8, // #5111
      EliminateShadowLevel: common.UInt8, // #5123
      HighGrayIndependentRefresh: common.UInt8, // #5135
      RemoveBadPoints: common.Bool, // #5147
      CouplingOptimizationLevel: common.UInt8, // #5159
      CouplingOptimizationTwoEnable: common.Bool, // #5171
      CouplingOptimizationTwo: common.UInt8, // #5183
      CurrentGainTwo: common.UInt8, // #5195
      CentralizeDisplayEnable: common.Bool, // #5207
      CentralizeDisplay: common.UInt8, // #5219
      LowGrayDisplayEffectEnhanceThree: common.UInt8,
    }),
  ],
  'ChipDP3265SeriesExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3265SeriesExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3265Series.decompiled.cs:4965
 */
export const ChipDP3265SeriesExtendProperty = t.intersection(
  [
    ChipDP3265SeriesExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3265SeriesExtendProperty') }),
  ],
  'ChipDP3265SeriesExtendProperty'
);
export interface ChipDP3265SeriesExtendProperty
  extends t.TypeOf<typeof ChipDP3265SeriesExtendProperty> {}
