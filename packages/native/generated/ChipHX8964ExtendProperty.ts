import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipHX8964ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      FirstRegValue: common.UInt16, // #2889
      IsUseNewModule: common.Bool, // #2891
      ChipLibVersion: common.UInt8, // #2893
      LowGreyOrderOpt2: common.UInt8, // #2895
      SettingTime: common.UInt8, // #2911
      OuAddTime: common.UInt8, // #2923
      QianW1: common.Bool, // #2935
      QianW2: common.Bool, // #2947
      CurrentGain: common.UInt8, // #2959
      SavePowerMode: common.Bool, // #2973
      ErrorCurrentGain: common.UInt16, // #2985
      OutputVolt: common.UInt8, // #2999
      FirstLineDark: common.UInt8, // #3011
      Reserved: common.UInt8, // #3023
      LowGreyColor: common.UInt8, // #3035
      CouplingOptimizationEnOne: common.UInt8, // #3047
      ShadowLevel: common.UInt8, // #3059
      CouplingOptimizationEnTwo: common.Bool, // #3071
      CouplingOptimization: common.UInt8, // #3083
      CouplingOptimizationEnAdd: common.Bool, // #3095
      CouplingOptimizationVo: common.UInt8, // #3107
      RemoveBadPoint: common.Bool,
    }),
  ],
  'ChipHX8964ExtendPropertyBase'
);
/**
 * Codec for {@link ChipHX8964ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHX8964.decompiled.cs:2884
 */
export const ChipHX8964ExtendProperty = t.intersection(
  [
    ChipHX8964ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHX8964ExtendProperty') }),
  ],
  'ChipHX8964ExtendProperty'
);
export interface ChipHX8964ExtendProperty extends t.TypeOf<typeof ChipHX8964ExtendProperty> {}
