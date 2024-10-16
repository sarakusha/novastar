import * as t from 'io-ts';
import { Chip16169sExtendProperty } from './Chip16169sExtendProperty'; // import
/**
 * Codec for interface {@link Chip16169sRGBExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:66540
 */
export const Chip16169sRGBExtendProperty = t.partial(
  {
    RedProperty: Chip16169sExtendProperty, // #66542
    GreenProperty: Chip16169sExtendProperty, // #66544
    BlueProperty: Chip16169sExtendProperty, // #66546
  },
  'Chip16169sRGBExtendProperty'
);
export interface Chip16169sRGBExtendProperty extends t.TypeOf<typeof Chip16169sRGBExtendProperty> {
  RedProperty?: Chip16169sExtendProperty;
  GreenProperty?: Chip16169sExtendProperty;
  BlueProperty?: Chip16169sExtendProperty;
}
