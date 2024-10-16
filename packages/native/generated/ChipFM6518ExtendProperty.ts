import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipFM6518ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RegFirst: common.UInt16, // #2788
      RegSecond: common.UInt16, // #2790
      RegThird: common.UInt16, // #2792
      RegFourth: common.UInt16, // #2794
      RegFifth: common.UInt16, // #2796
      IsUseNewModule: common.Bool, // #2798
      ChipLibVersion: common.UInt8, // #2800
      LowGrayAdjustGrade: common.UInt8, // #2802
      IsLowGrayAdjust: common.Bool, // #2814
      IsElimateShadow: common.Bool, // #2826
      IsLowGrayCompensate: common.Bool, // #2838
      LowGrayCompensateGrade: common.UInt8, // #2850
      LowAshEnhanceUniformity: common.UInt8, // #2862
      IsFirstLineSlantsDark: common.Bool, // #2874
      FirstLineSlantsDarkOptimization: common.UInt8, // #2886
      IsAberrationOptimize: common.Bool, // #2899
      ChannelStaggering: common.UInt8, // #2911
      IsCouplingOptimize: common.Bool, // #2923
      CouplingOptimize: common.UInt8, // #2935
      IsClampEnhancement: common.Bool, // #2947
      IsShadowingEnhancement: common.Bool, // #2959
      ChannelOpeningSpeed: common.UInt8, // #2971
      ChannelClosingSpeed: common.UInt8, // #2983
      Gain: common.UInt16, // #2995
    }),
  ],
  'ChipFM6518ExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6518ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipFM6518.decompiled.cs:2785
 */
export const ChipFM6518ExtendProperty = t.intersection(
  [
    ChipFM6518ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6518ExtendProperty') }),
  ],
  'ChipFM6518ExtendProperty'
);
export interface ChipFM6518ExtendProperty extends t.TypeOf<typeof ChipFM6518ExtendProperty> {}
