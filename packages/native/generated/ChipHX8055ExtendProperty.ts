import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipHX8055ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegFirst: common.UInt16_8048, // #1576
      RegSecond: common.UInt16_31615, // #1579
      RegThird: common.UInt16_18183, // #1582
      RegFourth: common.UInt16_256,
    }),
    t.partial({}),
  ],
  'ChipHX8055ExtendPropertyBase'
);
/**
 * Codec for {@link ChipHX8055ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHX8055.decompiled.cs:1573
 */
export const ChipHX8055ExtendProperty = t.intersection(
  [
    ChipHX8055ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHX8055ExtendProperty') }),
  ],
  'ChipHX8055ExtendProperty'
);
export interface ChipHX8055ExtendProperty extends t.TypeOf<typeof ChipHX8055ExtendProperty> {}
