import * as t from 'io-ts';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMY9862ExtendProperty } from './ChipMY9862ExtendProperty';
 // import
export const ChipMY9862RGBExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipMY9862ExtendProperty, // #56642
      GreenProperty: ChipMY9862ExtendProperty, // #56644
      BlueProperty: ChipMY9862ExtendProperty, // #56646
      VRedProperty: ChipMY9862ExtendProperty, // #56648
    }),
  ],
  'ChipMY9862RGBExtendPropertyBase'
);
/**
 * Codec for {@link ChipMY9862RGBExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:56640
 */
export const ChipMY9862RGBExtendProperty = t.intersection(
  [
    ChipMY9862RGBExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMY9862RGBExtendProperty') }),
  ],
  'ChipMY9862RGBExtendProperty'
);
export interface ChipMY9862RGBExtendProperty extends t.TypeOf<typeof ChipMY9862RGBExtendProperty> {
  RedProperty?: ChipMY9862ExtendProperty;
  GreenProperty?: ChipMY9862ExtendProperty;
  BlueProperty?: ChipMY9862ExtendProperty;
  VRedProperty?: ChipMY9862ExtendProperty;
}
