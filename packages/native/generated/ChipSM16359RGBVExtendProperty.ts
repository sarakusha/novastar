import * as t from 'io-ts';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipSM16359ExtendProperty } from './ChipSM16359ExtendProperty';
 // import
export const ChipSM16359RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipSM16359ExtendProperty, // #66057
      GreenProperty: ChipSM16359ExtendProperty, // #66059
      BlueProperty: ChipSM16359ExtendProperty, // #66061
      VRedProperty: ChipSM16359ExtendProperty, // #66063
    }),
  ],
  'ChipSM16359RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16359RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:66055
 */
export const ChipSM16359RGBVExtendProperty = t.intersection(
  [
    ChipSM16359RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16359RGBVExtendProperty') }),
  ],
  'ChipSM16359RGBVExtendProperty'
);
export interface ChipSM16359RGBVExtendProperty
  extends t.TypeOf<typeof ChipSM16359RGBVExtendProperty> {
  RedProperty?: ChipSM16359ExtendProperty;
  GreenProperty?: ChipSM16359ExtendProperty;
  BlueProperty?: ChipSM16359ExtendProperty;
  VRedProperty?: ChipSM16359ExtendProperty;
}
