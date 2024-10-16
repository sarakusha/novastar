import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipFM6363ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RegFirst: common.UInt16, // #888
      RegSecond: common.UInt16, // #890
      RegThird: common.UInt16, // #892
      RegFourth: common.UInt16, // #894
      RegFifth: common.UInt16, // #896
      RegSixth: common.UInt16, // #898
      FirstLineSlantsDarkOptimization: common.UInt8, // #900
      LowGrayAdjustGrade: common.UInt8, // #912
      IsLowGrayAdjust: common.Bool, // #924
      IsElimateShadow: common.Bool, // #936
      IsLowGrayCompensate: common.Bool, // #948
      LowGrayCompensateGrade: common.UInt8, // #960
      Gain: common.UInt16, // #972
      ErrorCurrentGain: common.UInt16, // #986
      IsFirstLineSlantsDark: common.Bool, // #1000
      LoadMistake: common.UInt8, // #1012
      CouplingElimination: common.UInt8, // #1024
      CouplingEliminationEn: common.Bool, // #1036
      LoadOpenSpeed: common.UInt8, // #1048
      LoadCloseSpeed: common.UInt8, // #1060
      ShadowEliminationEnhanced: common.Bool, // #1072
      IsClampEnhancement: common.Bool, // #1084
      IsUseNewModule: common.Bool, // #1096
      ChipLibVersion: common.UInt8, // #1098
    }),
  ],
  'ChipFM6363ExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6363ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipFM6363.decompiled.cs:885
 */
export const ChipFM6363ExtendProperty = t.intersection(
  [
    ChipFM6363ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6363ExtendProperty') }),
  ],
  'ChipFM6363ExtendProperty'
);
export interface ChipFM6363ExtendProperty extends t.TypeOf<typeof ChipFM6363ExtendProperty> {}
