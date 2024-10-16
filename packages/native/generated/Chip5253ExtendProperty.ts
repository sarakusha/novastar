import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const Chip5253ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      FirstSweepElimination: common.UInt8, // #46646
    }),
  ],
  'Chip5253ExtendPropertyBase'
);
/**
 * Codec for {@link Chip5253ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:46642
 */
export const Chip5253ExtendProperty = t.intersection(
  [Chip5253ExtendPropertyBase, t.partial({ '@_xsi:type': t.literal('Chip5253ExtendProperty') })],
  'Chip5253ExtendProperty'
);
export interface Chip5253ExtendProperty extends t.TypeOf<typeof Chip5253ExtendProperty> {}
