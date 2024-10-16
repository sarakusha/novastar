import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipDP3153ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #3419
      ChipLibVersion: common.UInt8, // #3421
      EliminateShadowMoment: common.UInt8, // #3423
      EliminateShadowTime: common.UInt8, // #3435
      CouplingOptimizationCoefficient: t.string, // #3447
      GammaSmooth: common.UInt8, // #3460
      CurrentGain: common.UInt16, // #3472
      ExternalResistanceOrCurrent: common.UInt8, // #3484
      ExternalResistanceRCurrent: common.UInt16, // #3496
      ExternalResistanceGCurrent: common.UInt16, // #3508
      ExternalResistanceBCurrent: common.UInt16, // #3520
      CouplingOptimizationOne: common.UInt8, // #3532
      CouplingOptimizationOneEnable: common.Bool, // #3544
      CouplingOptimizationEnhance: common.Bool, // #3556
      EliminateShadowLevelEnable: common.Bool, // #3568
      CouplingOptimizationEnable: common.Bool, // #3580
      LowGrayPittingOptimization: common.UInt8, // #3592
      LowGrayDisplayEffectEnhance: common.Bool, // #3604
      ConstantCurrentOutputInflectPointLevel: common.UInt8, // #3616
      EliminateShadowLevel: common.UInt8, // #3628
      RemoveBadPoints: common.Bool, // #3640
      CouplingOptimizationLevel: common.UInt8, // #3652
      CouplingOptimizationTwoEnable: common.Bool, // #3664
      CouplingOptimizationTwo: common.UInt8, // #3676
      CurrentGainTwo: common.UInt8, // #3688
      LowGrayDisplayEffectEnhanceThree: common.UInt8,
    }),
  ],
  'ChipDP3153ExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3153ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3153.decompiled.cs:3410
 */
export const ChipDP3153ExtendProperty = t.intersection(
  [
    ChipDP3153ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3153ExtendProperty') }),
  ],
  'ChipDP3153ExtendProperty'
);
export interface ChipDP3153ExtendProperty extends t.TypeOf<typeof ChipDP3153ExtendProperty> {}
