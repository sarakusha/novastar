import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipDP3265ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'), // #4084
      AddOneRegisterFor3269S: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #4090
      ChipLibVersion: common.UInt8, // #4092
      ConstantCurrentOutputInflectionPointGrade: common.UInt8, // #4094
      LowGreyPittingOptimization: common.UInt8, // #4106
      GammaSmoothingLevel: common.UInt8, // #4118
      ShadowEliminationLevelEnable: common.Bool, // #4130
      LowGrayDisplayEnhance: common.Bool, // #4142
      ShadowEliminationLevel: common.UInt8, // #4154
      ShadowEliminationTime: common.UInt8, // #4166
      ShadowEliminationMoment: common.UInt8, // #4178
      CouplingOptimizationEnable: common.Bool, // #4190
      CouplingOptimizationEnhance: common.Bool, // #4202
      CouplingOptimizationGrade: common.UInt8, // #4214
      CoupledOptimization1: common.UInt8, // #4226
      CouplingCoefficient: common.UInt8, // #4238
      CurrentGain: common.UInt16,
    }),
  ],
  'ChipDP3265ExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3265ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3265.decompiled.cs:4081
 */
export const ChipDP3265ExtendProperty = t.intersection(
  [
    ChipDP3265ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3265ExtendProperty') }),
  ],
  'ChipDP3265ExtendProperty'
);
export interface ChipDP3265ExtendProperty extends t.TypeOf<typeof ChipDP3265ExtendProperty> {}
