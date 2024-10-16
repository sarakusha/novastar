import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipICND2112ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegFirst: common.withDefault(common.UInt16, 32512), // #45
      RegSecond: common.withDefault(common.UInt16, 14626), // #48
      RegThird: common.withDefault(common.UInt16, 32752),
    }),
    t.partial({}),
  ],
  'ChipICND2112ExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2112ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2112.decompiled.cs:43
 */
export const ChipICND2112ExtendProperty = t.intersection(
  [
    ChipICND2112ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2112ExtendProperty') }),
  ],
  'ChipICND2112ExtendProperty'
);
export interface ChipICND2112ExtendProperty extends t.TypeOf<typeof ChipICND2112ExtendProperty> {}
