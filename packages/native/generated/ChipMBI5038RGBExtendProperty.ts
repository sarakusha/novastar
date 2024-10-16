import * as t from 'io-ts';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI5038ExtendProperty } from './ChipMBI5038ExtendProperty';
 // import
export const ChipMBI5038RGBExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipMBI5038ExtendProperty, // #56696
      GreenProperty: ChipMBI5038ExtendProperty, // #56698
      BlueProperty: ChipMBI5038ExtendProperty, // #56700
      VRedProperty: ChipMBI5038ExtendProperty, // #56702
    }),
  ],
  'ChipMBI5038RGBExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5038RGBExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:56694
 */
export const ChipMBI5038RGBExtendProperty = t.intersection(
  [
    ChipMBI5038RGBExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5038RGBExtendProperty') }),
  ],
  'ChipMBI5038RGBExtendProperty'
);
export interface ChipMBI5038RGBExtendProperty
  extends t.TypeOf<typeof ChipMBI5038RGBExtendProperty> {
  RedProperty?: ChipMBI5038ExtendProperty;
  GreenProperty?: ChipMBI5038ExtendProperty;
  BlueProperty?: ChipMBI5038ExtendProperty;
  VRedProperty?: ChipMBI5038ExtendProperty;
}
