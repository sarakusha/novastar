import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipDP3369SExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #4258
      ChipLibVersion: common.UInt8, // #4262
      EliminateShadowMoment: common.UInt8, // #4265
      OpenAdd: common.Bool, // #4277
      OpenFaster: common.UInt8, // #4289
      EliminateShadowTime: common.UInt8, // #4302
      CouplingOptimizationCoefficient: t.string, // #4314
      GammaSmooth: common.UInt8, // #4327
      GammaSmoothR: common.UInt8, // #4329
      GammaSmoothG: common.UInt8, // #4341
      GammaSmoothB: common.UInt8, // #4353
      GammaSmoothLow: common.UInt8, // #4365
      GammaSmoothLowR: common.UInt8, // #4378
      GammaSmoothLowG: common.UInt8, // #4390
      GammaSmoothLowB: common.UInt8, // #4402
      CurrentGain: common.UInt16, // #4414
      CurrentGainNo: common.UInt16, // #4426
      CouplingOptimizationOne: common.UInt8, // #4438
      CouplingOptimizationOneEnable: common.Bool, // #4450
      CouplingOptimizationLevelEn: common.Bool, // #4462
      CouplingOptimizationEnhance: common.Bool, // #4474
      CouplingOptimizationTwoEnable: common.Bool, // #4486
      CouplingOptimizationTwo: common.UInt8, // #4498
      EliminateShadowLevelEnable: common.Bool, // #4510
      CouplingOptimizationEnable: common.Bool, // #4522
      LowGrayPittingOptimization: common.UInt8, // #4534
      LowGrayDisplayEffectEnhance: common.Bool, // #4546
      LowGray: common.UInt8, // #4558
      ConstantCurrentOutputInflectPointLevel: common.UInt8, // #4570
      EliminateShadowLevel: common.UInt8, // #4582
      RemoveBadPoints: common.Bool, // #4594
      CouplingOptimizationLevel: common.UInt8, // #4606
      GammaTwoEnable: common.Bool, // #4618
      CurrentGainTwo: common.UInt8,
    }),
  ],
  'ChipDP3369SExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3369SExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3369S.decompiled.cs:4251
 */
export const ChipDP3369SExtendProperty = t.intersection(
  [
    ChipDP3369SExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3369SExtendProperty') }),
  ],
  'ChipDP3369SExtendProperty'
);
export interface ChipDP3369SExtendProperty extends t.TypeOf<typeof ChipDP3369SExtendProperty> {}
