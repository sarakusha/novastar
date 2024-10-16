import * as t from 'io-ts';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipSM16136ExtendProperty } from './ChipSM16136ExtendProperty';
 // import
export const ChipSM16136RGBExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipSM16136ExtendProperty, // #62778
      GreenProperty: ChipSM16136ExtendProperty, // #62780
      BlueProperty: ChipSM16136ExtendProperty, // #62782
      VRedProperty: ChipSM16136ExtendProperty, // #62784
    }),
  ],
  'ChipSM16136RGBExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16136RGBExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:62776
 */
export const ChipSM16136RGBExtendProperty = t.intersection(
  [
    ChipSM16136RGBExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16136RGBExtendProperty') }),
  ],
  'ChipSM16136RGBExtendProperty'
);
export interface ChipSM16136RGBExtendProperty
  extends t.TypeOf<typeof ChipSM16136RGBExtendProperty> {
  RedProperty?: ChipSM16136ExtendProperty;
  GreenProperty?: ChipSM16136ExtendProperty;
  BlueProperty?: ChipSM16136ExtendProperty;
  VRedProperty?: ChipSM16136ExtendProperty;
}
