import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSM16227ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RUnderEliminateGhostOne: common.Int32, // #58777
      GUnderEliminateGhostOne: common.Int32, // #58790
      BUnderEliminateGhostOne: common.Int32, // #58803
      RUnderEliminateGhostTwo: common.Int32, // #58816
      GUnderEliminateGhostTwo: common.Int32, // #58829
      BUnderEliminateGhostTwo: common.Int32, // #58842
      ROffsetCompsation: common.Int32, // #58855
      GOffsetCompsation: common.Int32, // #58868
      BOffsetCompsation: common.Int32, // #58881
      RFirstCompsation: common.Int32, // #58894
      GFirstCompsation: common.Int32, // #58907
      BFirstCompsation: common.Int32, // #58920
      IsAdvancedMode: common.Bool, // #58933
      RedRegValueConfigFirst: common.UInt16, // #58946
      GreenRegValueConfigFirst: common.UInt16, // #58959
      BlueRegValueConfigFirst: common.UInt16, // #58972
      VRedRegValueConfigFirst: common.UInt16, // #58985
    }),
  ],
  'ChipSM16227ExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16227ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:58741
 */
export const ChipSM16227ExtendProperty = t.intersection(
  [
    ChipSM16227ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16227ExtendProperty') }),
  ],
  'ChipSM16227ExtendProperty'
);
export interface ChipSM16227ExtendProperty extends t.TypeOf<typeof ChipSM16227ExtendProperty> {}
