import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5034BExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      FirstRegValue: common.UInt16, // #1227
      CurrentGain: common.UInt16, // #1229
    }),
  ],
  'ChipMBI5034BExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5034BExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5034B.decompiled.cs:1224
 */
export const ChipMBI5034BExtendProperty = t.intersection(
  [
    ChipMBI5034BExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5034BExtendProperty') }),
  ],
  'ChipMBI5034BExtendProperty'
);
export interface ChipMBI5034BExtendProperty extends t.TypeOf<typeof ChipMBI5034BExtendProperty> {}
