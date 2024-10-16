import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipHX8863ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'), // #2963
      RegisterAddOneArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      FirstRegValue: common.UInt16, // #2967
      IsUseNewModule: common.Bool, // #2969
      ChipLibVersion: common.UInt8, // #2971
      LowGreyOrderOpt2: common.UInt8, // #2973
      SettingTime: common.UInt8, // #2989
      CurrentGain: common.UInt8, // #3001
      ErrorCurrentGain: common.UInt16, // #3015
      OutputVolt: common.UInt8, // #3029
      FirstLineDark: common.UInt8, // #3041
      Reserved: common.UInt8, // #3053
      LowGreyColor: common.UInt8, // #3065
      CouplingOptimizationEnOne: common.UInt8, // #3077
      SavePowerMode: common.Bool, // #3089
      ShadowLevel: common.UInt8, // #3101
      CouplingOptimizationEnTwo: common.Bool, // #3113
      CouplingOptimization: common.UInt8, // #3125
      CouplingOptimizationEnAdd: common.Bool, // #3137
      CouplingOptimizationVo: common.UInt8,
    }),
  ],
  'ChipHX8863ExtendPropertyBase'
);
/**
 * Codec for {@link ChipHX8863ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHX8863.decompiled.cs:2960
 */
export const ChipHX8863ExtendProperty = t.intersection(
  [
    ChipHX8863ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHX8863ExtendProperty') }),
  ],
  'ChipHX8863ExtendProperty'
);
export interface ChipHX8863ExtendProperty extends t.TypeOf<typeof ChipHX8863ExtendProperty> {}
