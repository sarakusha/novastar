import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipFM6127ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RedRegValueConfigFirst: common.UInt16_65474, // #2831
      GreenRegValueConfigFirst: common.UInt16_65474, // #2834
      BlueRegValueConfigFirst: common.UInt16_65474, // #2837
      VRedRegValueConfigFirst: common.UInt16_65474, // #2840
      RedRegValueConfigSecond: common.UInt16_30818, // #2843
      GreenRegValueConfigSecond: common.UInt16_28770, // #2846
      BlueRegValueConfigSecond: common.UInt16_26722, // #2849
      VRedRegValueConfigSecond: common.UInt16_30818, // #2852
      RedRegValueConfigThird: common.UInt16_3841, // #2855
      GreenRegValueConfigThird: common.UInt16_3841, // #2858
      BlueRegValueConfigThird: common.UInt16_3841, // #2861
      VRedRegValueConfigThird: common.UInt16_3841, // #2864
      RedRegValueConfigFourth: common.UInt16_65474, // #2867
      GreenRegValueConfigFourth: common.UInt16_65474, // #2870
      BlueRegValueConfigFourth: common.UInt16_65474, // #2873
      VRedRegValueConfigFourth: common.UInt16_65474, // #2876
      IsAdvancedMode: common.Bool_true,
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #2827
      ChipLibVersion: common.UInt8,
    }),
  ],
  'ChipFM6127ExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6127ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipFM6127.decompiled.cs:2816
 */
export const ChipFM6127ExtendProperty = t.intersection(
  [
    ChipFM6127ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6127ExtendProperty') }),
  ],
  'ChipFM6127ExtendProperty'
);
export interface ChipFM6127ExtendProperty extends t.TypeOf<typeof ChipFM6127ExtendProperty> {}
