import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipHX8866ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'), // #2905
      RegisterAddOneArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      FirstRegValue: common.UInt16, // #2909
      IsUseNewModule: common.Bool, // #2911
      ChipLibVersion: common.UInt8, // #2913
      LowGreyOrderOpt2: common.UInt8, // #2915
      SettingTime: common.UInt8, // #2931
      OuAddTime: common.UInt8, // #2943
      QianW1: common.Bool, // #2955
      QianW2: common.Bool, // #2967
      CurrentGain: common.UInt8, // #2979
      ErrorCurrentGain: common.UInt16, // #2993
      OutputVolt: common.UInt8, // #3007
      FirstLineDark: common.UInt8, // #3019
      Reserved: common.UInt8, // #3031
      LowGreyColor: common.UInt8, // #3043
      CouplingOptimizationEnOne: common.UInt8, // #3055
      SavePowerMode: common.Bool, // #3067
      ShadowLevel: common.UInt8, // #3079
      CouplingOptimizationEnTwo: common.Bool, // #3091
      CouplingOptimization: common.UInt8, // #3103
      CouplingOptimizationEnAdd: common.Bool, // #3115
      CouplingOptimizationVo: common.UInt8,
    }),
  ],
  'ChipHX8866ExtendPropertyBase'
);
/**
 * Codec for {@link ChipHX8866ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHX8866.decompiled.cs:2902
 */
export const ChipHX8866ExtendProperty = t.intersection(
  [
    ChipHX8866ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHX8866ExtendProperty') }),
  ],
  'ChipHX8866ExtendProperty'
);
export interface ChipHX8866ExtendProperty extends t.TypeOf<typeof ChipHX8866ExtendProperty> {}
