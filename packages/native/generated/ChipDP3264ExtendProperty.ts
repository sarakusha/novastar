import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipDP3264ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #3380
      ChipLibVersion: common.UInt8, // #3382
      ConstantCurrentOutputInflectionPointGrade: common.UInt8, // #3384
      LowGreyPittingOptimization: common.UInt8, // #3396
      GammaSmoothingLevel: common.UInt8, // #3408
      ShadowEliminationLevelEnable: common.Bool, // #3420
      ShadowEliminationLevel: common.UInt8, // #3432
      ShadowEliminationTime: common.UInt8, // #3444
      ShadowEliminationMoment: common.UInt8, // #3456
      CouplingOptimizationEnable: common.Bool, // #3468
      CouplingOptimizationEnhance: common.Bool, // #3480
      CouplingOptimizationGrade: common.UInt8, // #3492
      CouplingCoefficient: common.UInt8, // #3504
      CurrentGain: common.UInt16,
    }),
  ],
  'ChipDP3264ExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3264ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3264.decompiled.cs:3374
 */
export const ChipDP3264ExtendProperty = t.intersection(
  [
    ChipDP3264ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3264ExtendProperty') }),
  ],
  'ChipDP3264ExtendProperty'
);
export interface ChipDP3264ExtendProperty extends t.TypeOf<typeof ChipDP3264ExtendProperty> {}
