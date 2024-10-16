import * as t from 'io-ts';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICN2065ExtendProperty } from './ChipICN2065ExtendProperty';
 // import
export const ChipICN2065RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipICN2065ExtendProperty, // #51057
      GreenProperty: ChipICN2065ExtendProperty, // #51107
      BlueProperty: ChipICN2065ExtendProperty, // #51157
      VRedProperty: ChipICN2065ExtendProperty, // #51207
    }),
  ],
  'ChipICN2065RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICN2065RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:51055
 */
export const ChipICN2065RGBVExtendProperty = t.intersection(
  [
    ChipICN2065RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICN2065RGBVExtendProperty') }),
  ],
  'ChipICN2065RGBVExtendProperty'
);
export interface ChipICN2065RGBVExtendProperty
  extends t.TypeOf<typeof ChipICN2065RGBVExtendProperty> {
  RedProperty?: ChipICN2065ExtendProperty;
  GreenProperty?: ChipICN2065ExtendProperty;
  BlueProperty?: ChipICN2065ExtendProperty;
  VRedProperty?: ChipICN2065ExtendProperty;
}
