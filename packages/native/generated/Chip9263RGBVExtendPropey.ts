import * as t from 'io-ts';
import { ChipMY9263ExtendProperty } from './ChipMY9263ExtendProperty'; // import
/**
 * Codec for interface {@link Chip9263RGBVExtendPropey}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:43017
 */
export const Chip9263RGBVExtendPropey = t.partial(
  {
    RedProperty: ChipMY9263ExtendProperty, // #43019
    GreenProperty: ChipMY9263ExtendProperty, // #43021
    BlueProperty: ChipMY9263ExtendProperty, // #43023
    VRedProperty: ChipMY9263ExtendProperty, // #43025
  },
  'Chip9263RGBVExtendPropey'
);
export interface Chip9263RGBVExtendPropey extends t.TypeOf<typeof Chip9263RGBVExtendPropey> {
  RedProperty?: ChipMY9263ExtendProperty;
  GreenProperty?: ChipMY9263ExtendProperty;
  BlueProperty?: ChipMY9263ExtendProperty;
  VRedProperty?: ChipMY9263ExtendProperty;
}
