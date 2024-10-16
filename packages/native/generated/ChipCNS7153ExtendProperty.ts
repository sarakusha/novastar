import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCNS7153ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegFirst: common.UInt16_8048, // #1582
      RegSecond: common.UInt16_31615, // #1585
      RegThird: common.UInt16_18183, // #1588
      RegFourth: common.UInt16_256,
    }),
    t.partial({}),
  ],
  'ChipCNS7153ExtendPropertyBase'
);
/**
 * Codec for {@link ChipCNS7153ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCNS7153.decompiled.cs:1579
 */
export const ChipCNS7153ExtendProperty = t.intersection(
  [
    ChipCNS7153ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCNS7153ExtendProperty') }),
  ],
  'ChipCNS7153ExtendProperty'
);
export interface ChipCNS7153ExtendProperty extends t.TypeOf<typeof ChipCNS7153ExtendProperty> {}
