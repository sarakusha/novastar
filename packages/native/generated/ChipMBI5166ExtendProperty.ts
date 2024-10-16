import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5166ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      ColorCompensate: common.UInt8_3,
    }),
    t.partial({
      SetBlanking: common.UInt8,
    }),
  ],
  'ChipMBI5166ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5166ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:62613
 */
export const ChipMBI5166ExtendProperty = t.intersection(
  [
    ChipMBI5166ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5166ExtendProperty') }),
  ],
  'ChipMBI5166ExtendProperty'
);
export interface ChipMBI5166ExtendProperty extends t.TypeOf<typeof ChipMBI5166ExtendProperty> {}
