import * as t from 'io-ts';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI5043ExtendProperty } from './ChipMBI5043ExtendProperty';
 // import
export const Chip5043RGBVExtendPropeyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipMBI5043ExtendProperty, // #56991
      GreenProperty: ChipMBI5043ExtendProperty, // #56993
      BlueProperty: ChipMBI5043ExtendProperty, // #56995
      VRedProperty: ChipMBI5043ExtendProperty, // #56997
    }),
  ],
  'Chip5043RGBVExtendPropeyBase'
);
/**
 * Codec for {@link Chip5043RGBVExtendPropey}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:56989
 */
export const Chip5043RGBVExtendPropey = t.intersection(
  [
    Chip5043RGBVExtendPropeyBase,
    t.partial({ '@_xsi:type': t.literal('Chip5043RGBVExtendPropey') }),
  ],
  'Chip5043RGBVExtendPropey'
);
export interface Chip5043RGBVExtendPropey extends t.TypeOf<typeof Chip5043RGBVExtendPropey> {
  RedProperty?: ChipMBI5043ExtendProperty;
  GreenProperty?: ChipMBI5043ExtendProperty;
  BlueProperty?: ChipMBI5043ExtendProperty;
  VRedProperty?: ChipMBI5043ExtendProperty;
}
