import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipHX8128ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'), // #2801
      RegisterAddOneArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      FirstRegValue: common.UInt16, // #2805
      IsUseNewModule: common.Bool, // #2807
      ChipLibVersion: common.UInt8, // #2809
      ShadowLevel: common.UInt8, // #2811
      VaniaBeginTime: common.UInt8, // #2823
      FirstLineDarkTime: common.UInt8, // #2835
      FirstLineDarkLevel: common.UInt8, // #2847
      LowGreyColorOptimize: common.UInt8, // #2859
      LowGreyColor: common.UInt8, // #2871
      CouplingOptimizationEnOne: common.UInt8, // #2883
      CouplingBeginTime: common.UInt8, // #2895
      CouplingOptimization: common.UInt8, // #2907
      CouplingOptimizationTwoEnAdd: common.Bool, // #2919
      CouplingOptimizationVo: common.UInt8, // #2931
      CouplingOptimizationEn: common.Bool, // #2943
      OutputVolt: common.UInt8, // #2955
      LowGrayEn: common.Bool, // #2967
      SavePowerMode: common.Bool, // #2979
      DataRePelace: common.UInt8, // #2995
      CurrentGain: common.UInt8, // #3007
      RemoveBadPoint: common.Bool, // #3021
      ErrorCurrentGain: common.UInt16,
    }),
  ],
  'ChipHX8128ExtendPropertyBase'
);
/**
 * Codec for {@link ChipHX8128ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHX8128.decompiled.cs:2798
 */
export const ChipHX8128ExtendProperty = t.intersection(
  [
    ChipHX8128ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHX8128ExtendProperty') }),
  ],
  'ChipHX8128ExtendProperty'
);
export interface ChipHX8128ExtendProperty extends t.TypeOf<typeof ChipHX8128ExtendProperty> {}
