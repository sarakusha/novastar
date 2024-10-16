import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const Chip2020ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      BrightnessGain: common.Int32, // #55704
    }),
  ],
  'Chip2020ExtendPropertyBase'
);
/**
 * Codec for {@link Chip2020ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:55700
 */
export const Chip2020ExtendProperty = t.intersection(
  [Chip2020ExtendPropertyBase, t.partial({ '@_xsi:type': t.literal('Chip2020ExtendProperty') })],
  'Chip2020ExtendProperty'
);
export interface Chip2020ExtendProperty extends t.TypeOf<typeof Chip2020ExtendProperty> {}
