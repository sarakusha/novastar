import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipDP3364SExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #4208
      ChipLibVersion: common.UInt8, // #4212
      EliminateShadowMoment: common.UInt8, // #4215
      EliminateShadowTime: common.UInt8, // #4227
      CouplingOptimizationCoefficient: t.string, // #4239
      GammaSmooth: common.UInt8, // #4252
      GammaSmoothR: common.UInt8, // #4254
      GammaSmoothG: common.UInt8, // #4266
      GammaSmoothB: common.UInt8, // #4278
      GammaSmoothLow: common.UInt8, // #4290
      GammaSmoothLowR: common.UInt8, // #4303
      GammaSmoothLowG: common.UInt8, // #4315
      GammaSmoothLowB: common.UInt8, // #4327
      CurrentGain: common.UInt16, // #4339
      CurrentGainNo: common.UInt16, // #4351
      CouplingOptimizationOne: common.UInt8, // #4363
      CouplingOptimizationOneEnable: common.Bool, // #4375
      CouplingOptimizationLevelEn: common.Bool, // #4387
      CouplingOptimizationEnhance: common.Bool, // #4399
      CouplingOptimizationTwoEnable: common.Bool, // #4411
      CouplingOptimizationTwo: common.UInt8, // #4423
      EliminateShadowLevelEnable: common.Bool, // #4435
      CouplingOptimizationEnable: common.Bool, // #4447
      OpenFaster: common.UInt8, // #4459
      LowGrayPittingOptimization: common.UInt8, // #4472
      LowGrayDisplayEffectEnhance: common.Bool, // #4484
      LowGray: common.UInt8, // #4496
      ConstantCurrentOutputInflectPointLevel: common.UInt8, // #4508
      EliminateShadowLevel: common.UInt8, // #4520
      RemoveBadPoints: common.Bool, // #4532
      CouplingOptimizationLevel: common.UInt8, // #4544
      GammaTwoEnable: common.Bool, // #4556
      CurrentGainTwo: common.UInt8,
    }),
  ],
  'ChipDP3364SExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3364SExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3364S.decompiled.cs:4201
 */
export const ChipDP3364SExtendProperty = t.intersection(
  [
    ChipDP3364SExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3364SExtendProperty') }),
  ],
  'ChipDP3364SExtendProperty'
);
export interface ChipDP3364SExtendProperty extends t.TypeOf<typeof ChipDP3364SExtendProperty> {}
