import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipDP3365SExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #4713
      ChipLibVersion: common.UInt8, // #4715
      EliminateShadowMoment: common.UInt8, // #4717
      OpenAdd: common.Bool, // #4730
      OpenFaster: common.UInt8, // #4742
      EliminateShadowTime: common.UInt8, // #4755
      CouplingOptimizationCoefficient: t.string, // #4768
      GammaSmoothR: common.UInt8, // #4781
      GammaSmoothG: common.UInt8, // #4793
      GammaSmoothB: common.UInt8, // #4805
      GammaSmooth: common.UInt8, // #4817
      GammaSmoothLow: common.UInt8, // #4819
      GammaSmoothLowR: common.UInt8, // #4842
      GammaSmoothLowG: common.UInt8, // #4854
      GammaSmoothLowB: common.UInt8, // #4866
      CurrentGain: common.UInt16, // #4878
      CurrentGainNo: common.UInt16, // #4890
      CouplingOptimizationOne: common.UInt8, // #4902
      CouplingOptimizationOneEnable: common.Bool, // #4914
      CouplingOptimizationLevelEn: common.Bool, // #4926
      CouplingOptimizationEnhance: common.Bool, // #4938
      CouplingOptimizationTwoEnable: common.Bool, // #4950
      CouplingOptimizationTwo: common.UInt8, // #4962
      EliminateShadowLevelEnable: common.Bool, // #4974
      CouplingOptimizationEnable: common.Bool, // #4986
      DoublePin: common.Bool, // #4998
      Beip: common.Bool, // #5010
      LowGrayPittingOptimization: common.UInt8, // #5022
      LowGrayDisplayEffectEnhance: common.Bool, // #5034
      LowGray: common.UInt8, // #5046
      ConstantCurrentOutputInflectPointLevel: common.UInt8, // #5060
      EliminateShadowLevel: common.UInt8, // #5072
      RemoveBadPoints: common.Bool, // #5084
      CouplingOptimizationLevel: common.UInt8, // #5096
      GammaTwoEnable: common.Bool, // #5108
      CurrentGainTwo: common.UInt8,
    }),
  ],
  'ChipDP3365SExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3365SExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3365S.decompiled.cs:4704
 */
export const ChipDP3365SExtendProperty = t.intersection(
  [
    ChipDP3365SExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3365SExtendProperty') }),
  ],
  'ChipDP3365SExtendProperty'
);
export interface ChipDP3365SExtendProperty extends t.TypeOf<typeof ChipDP3365SExtendProperty> {}
