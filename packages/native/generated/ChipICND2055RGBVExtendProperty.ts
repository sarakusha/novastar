import * as t from 'io-ts';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICND2055ExtendProperty } from './ChipICND2055ExtendProperty';
 // import
export const ChipICND2055RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipICND2055ExtendProperty, // #48296
      GreenProperty: ChipICND2055ExtendProperty, // #48346
      BlueProperty: ChipICND2055ExtendProperty, // #48396
      VRedProperty: ChipICND2055ExtendProperty, // #48446
    }),
  ],
  'ChipICND2055RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2055RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:48294
 */
export const ChipICND2055RGBVExtendProperty = t.intersection(
  [
    ChipICND2055RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2055RGBVExtendProperty') }),
  ],
  'ChipICND2055RGBVExtendProperty'
);
export interface ChipICND2055RGBVExtendProperty
  extends t.TypeOf<typeof ChipICND2055RGBVExtendProperty> {
  RedProperty?: ChipICND2055ExtendProperty;
  GreenProperty?: ChipICND2055ExtendProperty;
  BlueProperty?: ChipICND2055ExtendProperty;
  VRedProperty?: ChipICND2055ExtendProperty;
}
