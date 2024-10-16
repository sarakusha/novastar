import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const Chip16159ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      EliminateAfterLowGrade: common.UInt8_7, // #63616
      DimCompensation: common.UInt8_1, // #63642
      LowAshImprovement2: common.UInt8_3,
    }),
    t.partial({
      LowAshImprovement1: common.UInt8,
    }),
  ],
  'Chip16159ExtendPropertyBase'
);
/**
 * Codec for {@link Chip16159ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:63606
 */
export const Chip16159ExtendProperty = t.intersection(
  [Chip16159ExtendPropertyBase, t.partial({ '@_xsi:type': t.literal('Chip16159ExtendProperty') })],
  'Chip16159ExtendProperty'
);
export interface Chip16159ExtendProperty extends t.TypeOf<typeof Chip16159ExtendProperty> {}
