import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipDP3254ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #4028
      ChipLibVersion: common.UInt8, // #4030
      EliminateShadowMoment: common.UInt8, // #4032
      EliminateShadowTime: common.UInt8, // #4044
      CouplingOptimizationCoefficient: t.string, // #4056
      GammaSmooth: common.UInt8, // #4069
      CurrentGain: common.UInt16, // #4081
      CurrentGainNo: common.UInt16, // #4093
      CouplingOptimizationOne: common.UInt8, // #4105
      CouplingOptimizationOneEnable: common.Bool, // #4117
      CouplingOptimizationEnhance: common.Bool, // #4129
      EliminateShadowLevelEnable: common.Bool, // #4141
      CouplingOptimizationEnable: common.Bool, // #4153
      LowGrayPittingOptimization: common.UInt8, // #4165
      LowGrayDisplayEffectEnhance: common.Bool, // #4177
      ConstantCurrentOutputInflectPointLevel: common.UInt8, // #4189
      EliminateShadowLevel: common.UInt8, // #4201
      RemoveBadPoints: common.Bool, // #4213
      CouplingOptimizationLevel: common.UInt8, // #4225
      CouplingOptimizationTwoEnable: common.Bool, // #4237
      CouplingOptimizationTwo: common.UInt8, // #4249
      CurrentGainTwo: common.UInt8, // #4261
      LowGrayDisplayEffectEnhanceThree: common.UInt8,
    }),
  ],
  'ChipDP3254ExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3254ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3254.decompiled.cs:4019
 */
export const ChipDP3254ExtendProperty = t.intersection(
  [
    ChipDP3254ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3254ExtendProperty') }),
  ],
  'ChipDP3254ExtendProperty'
);
export interface ChipDP3254ExtendProperty extends t.TypeOf<typeof ChipDP3254ExtendProperty> {}
