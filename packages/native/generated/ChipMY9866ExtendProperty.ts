import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMY9866ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsAdvancedMode: common.Bool, // #45703
      RActionSpeed: common.Int32, // #45716
      GActionSpeed: common.Int32, // #45729
      BActionSpeed: common.Int32, // #45742
      RBlankingFunction: common.Int32, // #45755
      GBlankingFunction: common.Int32, // #45768
      BBlankingFunction: common.Int32, // #45781
      RQuicklyOpenFunction: common.Int32, // #45794
      GQuicklyOpenFunction: common.Int32, // #45807
      BQuicklyOpenFunction: common.Int32, // #45820
      RedRegValueConfigFirst: common.UInt16, // #45833
      GreenRegValueConfigFirst: common.UInt16, // #45846
      BlueRegValueConfigFirst: common.UInt16, // #45859
      VRedRegValueConfigFirst: common.UInt16, // #45872
    }),
  ],
  'ChipMY9866ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMY9866ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:45673
 */
export const ChipMY9866ExtendProperty = t.intersection(
  [
    ChipMY9866ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMY9866ExtendProperty') }),
  ],
  'ChipMY9866ExtendProperty'
);
export interface ChipMY9866ExtendProperty extends t.TypeOf<typeof ChipMY9866ExtendProperty> {}
