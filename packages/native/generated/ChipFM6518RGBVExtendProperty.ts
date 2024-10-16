import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipFM6518ExtendProperty } from './ChipFM6518ExtendProperty';
 // import
export const ChipFM6518RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipFM6518ExtendProperty, // #3086
      GreenProperty: ChipFM6518ExtendProperty, // #3088
      BlueProperty: ChipFM6518ExtendProperty, // #3090
      VRedProperty: ChipFM6518ExtendProperty, // #3092
      ScanCount: common.UInt8, // #3098
      IsStarSwipPoint: common.Bool, // #3112
      IsAdvancedModel: common.Bool, // #3126
      IsUseNewModule: common.Bool, // #3138
      ChipLibVersion: common.UInt8, // #3140
    }),
  ],
  'ChipFM6518RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6518RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipFM6518.decompiled.cs:3079
 */
export const ChipFM6518RGBVExtendProperty = t.intersection(
  [
    ChipFM6518RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6518RGBVExtendProperty') }),
  ],
  'ChipFM6518RGBVExtendProperty'
);
export interface ChipFM6518RGBVExtendProperty
  extends t.TypeOf<typeof ChipFM6518RGBVExtendProperty> {
  RedProperty?: ChipFM6518ExtendProperty;
  GreenProperty?: ChipFM6518ExtendProperty;
  BlueProperty?: ChipFM6518ExtendProperty;
  VRedProperty?: ChipFM6518ExtendProperty;
}
