import * as t from 'io-ts';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipSUM2028ExtendProperty } from './ChipSUM2028ExtendProperty';
 // import
export const Chip2028RGBVExtendPropeyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipSUM2028ExtendProperty, // #62727
      GreenProperty: ChipSUM2028ExtendProperty, // #62729
      BlueProperty: ChipSUM2028ExtendProperty, // #62731
      VRedProperty: ChipSUM2028ExtendProperty, // #62733
    }),
  ],
  'Chip2028RGBVExtendPropeyBase'
);
/**
 * Codec for {@link Chip2028RGBVExtendPropey}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:62725
 */
export const Chip2028RGBVExtendPropey = t.intersection(
  [
    Chip2028RGBVExtendPropeyBase,
    t.partial({ '@_xsi:type': t.literal('Chip2028RGBVExtendPropey') }),
  ],
  'Chip2028RGBVExtendPropey'
);
export interface Chip2028RGBVExtendPropey extends t.TypeOf<typeof Chip2028RGBVExtendPropey> {
  RedProperty?: ChipSUM2028ExtendProperty;
  GreenProperty?: ChipSUM2028ExtendProperty;
  BlueProperty?: ChipSUM2028ExtendProperty;
  VRedProperty?: ChipSUM2028ExtendProperty;
}
