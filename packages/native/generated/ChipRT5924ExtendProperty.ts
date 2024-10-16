import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipRT5924ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RLowAshRange: common.UInt8_4, // #63478
      GLowAshRange: common.UInt8_4, // #63490
      BLowAshRange: common.UInt8_4, // #63502
      VRLowAshRange: common.UInt8_4, // #63514
      RPrechargeFun: common.Bool_true, // #63526
      GPrechargeFun: common.Bool_true, // #63538
      BPrechargeFun: common.Bool_true, // #63550
      VRPrechargeFun: common.Bool_true,
    }),
    t.partial({}),
  ],
  'ChipRT5924ExtendPropertyBase'
);
/**
 * Codec for {@link ChipRT5924ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:63460
 */
export const ChipRT5924ExtendProperty = t.intersection(
  [
    ChipRT5924ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipRT5924ExtendProperty') }),
  ],
  'ChipRT5924ExtendProperty'
);
export interface ChipRT5924ExtendProperty extends t.TypeOf<typeof ChipRT5924ExtendProperty> {}
