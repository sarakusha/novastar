import * as t from 'io-ts';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipTLC5945ExtendPropertyBase = t.intersection(
  [ChipBaseExtendPropey, t.partial({})],
  'ChipTLC5945ExtendPropertyBase'
);
/**
 * Codec for {@link ChipTLC5945ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipTLC5945.decompiled.cs:920
 */
export const ChipTLC5945ExtendProperty = t.intersection(
  [
    ChipTLC5945ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTLC5945ExtendProperty') }),
  ],
  'ChipTLC5945ExtendProperty'
);
export interface ChipTLC5945ExtendProperty extends t.TypeOf<typeof ChipTLC5945ExtendProperty> {}
