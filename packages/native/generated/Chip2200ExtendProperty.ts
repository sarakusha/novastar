import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const Chip2200ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RegisterList: common.Base64, // #55663
    }),
  ],
  'Chip2200ExtendPropertyBase'
);
/**
 * Codec for {@link Chip2200ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:55644
 */
export const Chip2200ExtendProperty = t.intersection(
  [Chip2200ExtendPropertyBase, t.partial({ '@_xsi:type': t.literal('Chip2200ExtendProperty') })],
  'Chip2200ExtendProperty'
);
export interface Chip2200ExtendProperty extends t.TypeOf<typeof Chip2200ExtendProperty> {}
