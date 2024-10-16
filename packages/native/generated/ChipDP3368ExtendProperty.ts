import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipDP3368ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #4073
      ChipLibVersion: common.UInt8, // #4075
      EliminateShadowMoment: common.UInt8, // #4077
      EliminateShadowTime: common.UInt8, // #4089
      CouplingOptimizationCoefficient: t.string, // #4101
      GammaSmooth: common.UInt8, // #4114
      CurrentGain: common.UInt16, // #4126
      CouplingOptimizationOne: common.UInt8, // #4138
      CouplingOptimizationEnhance: common.Bool, // #4150
      EliminateShadowLevelEnable: common.Bool, // #4162
      CouplingOptimizationEnable: common.Bool, // #4174
      LowGrayPittingOptimization: common.UInt8, // #4186
      LowGrayDisplayEffectEnhance: common.Bool, // #4198
      ConstantCurrentOutputInflectPointLevel: common.UInt8, // #4210
      EliminateShadowLevel: common.UInt8, // #4222
      EliminateShadowLevelEn: common.Bool, // #4234
      CouplingOptimizationLevel: common.UInt8,
    }),
  ],
  'ChipDP3368ExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3368ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3368.decompiled.cs:4064
 */
export const ChipDP3368ExtendProperty = t.intersection(
  [
    ChipDP3368ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3368ExtendProperty') }),
  ],
  'ChipDP3368ExtendProperty'
);
export interface ChipDP3368ExtendProperty extends t.TypeOf<typeof ChipDP3368ExtendProperty> {}
