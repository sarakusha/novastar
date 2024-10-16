import * as t from 'io-ts';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI5166ExtendProperty } from './ChipMBI5166ExtendProperty';
 // import
export const Chip5166RGBVExtendPropeyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipMBI5166ExtendProperty, // #62673
      GreenProperty: ChipMBI5166ExtendProperty, // #62675
      BlueProperty: ChipMBI5166ExtendProperty, // #62677
      VRedProperty: ChipMBI5166ExtendProperty, // #62679
    }),
  ],
  'Chip5166RGBVExtendPropeyBase'
);
/**
 * Codec for {@link Chip5166RGBVExtendPropey}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:62671
 */
export const Chip5166RGBVExtendPropey = t.intersection(
  [
    Chip5166RGBVExtendPropeyBase,
    t.partial({ '@_xsi:type': t.literal('Chip5166RGBVExtendPropey') }),
  ],
  'Chip5166RGBVExtendPropey'
);
export interface Chip5166RGBVExtendPropey extends t.TypeOf<typeof Chip5166RGBVExtendPropey> {
  RedProperty?: ChipMBI5166ExtendProperty;
  GreenProperty?: ChipMBI5166ExtendProperty;
  BlueProperty?: ChipMBI5166ExtendProperty;
  VRedProperty?: ChipMBI5166ExtendProperty;
}
