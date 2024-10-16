import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSM16237ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RUnderEliminateGhostOne: common.Int32_5, // #59091
      GUnderEliminateGhostOne: common.Int32_5, // #59104
      BUnderEliminateGhostOne: common.Int32_5, // #59117
      RUnderEliminateGhostTwo: common.Int32_4, // #59130
      GUnderEliminateGhostTwo: common.Int32_4, // #59143
      BUnderEliminateGhostTwo: common.Int32_4, // #59169
      GOffsetCompsation: common.Int32_1, // #59182
      BOffsetCompsation: common.Int32_1, // #59208
      GFirstCompsation: common.Int32_6, // #59221
      BFirstCompsation: common.Int32_6, // #59234
      SwapErrorPoint: common.UInt8_16, // #59247
      RSwapErrorPoint: common.UInt8_31, // #59260
      GSwapErrorPoint: common.UInt8_31, // #59273
      BSwapErrorPoint: common.UInt8_31,
    }),
    t.partial({
      ROffsetCompsation: common.Int32, // #59195
      RFirstCompsation: common.Int32, // #59286
      IsAdvancedMode: common.Bool, // #59299
      RedRegValueConfigFirst: common.UInt16, // #59312
      GreenRegValueConfigFirst: common.UInt16, // #59325
      BlueRegValueConfigFirst: common.UInt16, // #59338
      VRedRegValueConfigFirst: common.UInt16, // #59351
      RedRegValueConfigSecond: common.UInt16, // #59364
      GreenRegValueConfigSecond: common.UInt16, // #59377
      BlueRegValueConfigSecond: common.UInt16, // #59390
      VRedRegValueConfigSecond: common.UInt16,
    }),
  ],
  'ChipSM16237ExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16237ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:59039
 */
export const ChipSM16237ExtendProperty = t.intersection(
  [
    ChipSM16237ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16237ExtendProperty') }),
  ],
  'ChipSM16237ExtendProperty'
);
export interface ChipSM16237ExtendProperty extends t.TypeOf<typeof ChipSM16237ExtendProperty> {}
