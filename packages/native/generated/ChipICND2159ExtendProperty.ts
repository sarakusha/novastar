import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipICND2159ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsUseNewModule: common.Bool, // #3101
      ChipLibVersion: common.UInt8, // #3103
      FirstRegValue: common.UInt16, // #3105
      SecondRegValue: common.UInt16, // #3107
      ThirdRegValue: common.UInt16, // #3109
      FourthRegValue: common.UInt16, // #3111
      LowAshPitsImprove: common.UInt8, // #3113
      IsAberrationOptimize: common.Bool, // #3125
      IsElimateShadow: common.Bool, // #3137
      LowGrayAdjustGrade: common.UInt8, // #3149
      IsLowGrayAdjust: common.Bool, // #3161
      LowGrayCompensateGrade: common.UInt8, // #3173
      IsLowGrayCompensate: common.Bool, // #3185
      FirstLineSlantsDarkOpt: common.UInt8, // #3197
      CurrentGain: common.UInt16, // #3209
    }),
  ],
  'ChipICND2159ExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2159ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2159.decompiled.cs:3098
 */
export const ChipICND2159ExtendProperty = t.intersection(
  [
    ChipICND2159ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2159ExtendProperty') }),
  ],
  'ChipICND2159ExtendProperty'
);
export interface ChipICND2159ExtendProperty extends t.TypeOf<typeof ChipICND2159ExtendProperty> {}
