import * as t from 'io-ts';
import { Chip5155ExtendProperty } from './Chip5155ExtendProperty'; // import
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const Chip5155RGBVExtendPropeyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: Chip5155ExtendProperty, // #56533
      GreenProperty: Chip5155ExtendProperty, // #56535
      BlueProperty: Chip5155ExtendProperty, // #56537
      VRedProperty: Chip5155ExtendProperty, // #56539
    }),
  ],
  'Chip5155RGBVExtendPropeyBase'
);
/**
 * Codec for {@link Chip5155RGBVExtendPropey}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:56531
 */
export const Chip5155RGBVExtendPropey = t.intersection(
  [
    Chip5155RGBVExtendPropeyBase,
    t.partial({ '@_xsi:type': t.literal('Chip5155RGBVExtendPropey') }),
  ],
  'Chip5155RGBVExtendPropey'
);
export interface Chip5155RGBVExtendPropey extends t.TypeOf<typeof Chip5155RGBVExtendPropey> {
  RedProperty?: Chip5155ExtendProperty;
  GreenProperty?: Chip5155ExtendProperty;
  BlueProperty?: Chip5155ExtendProperty;
  VRedProperty?: Chip5155ExtendProperty;
}
