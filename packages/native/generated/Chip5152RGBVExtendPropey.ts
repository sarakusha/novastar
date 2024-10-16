import * as t from 'io-ts';
import { Chip5152ExtendProperty } from './Chip5152ExtendProperty'; // import
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const Chip5152RGBVExtendPropeyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: Chip5152ExtendProperty, // #42734
      GreenProperty: Chip5152ExtendProperty, // #42736
      BlueProperty: Chip5152ExtendProperty, // #42738
      VRedProperty: Chip5152ExtendProperty, // #42740
    }),
  ],
  'Chip5152RGBVExtendPropeyBase'
);
/**
 * Codec for {@link Chip5152RGBVExtendPropey}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:42732
 */
export const Chip5152RGBVExtendPropey = t.intersection(
  [
    Chip5152RGBVExtendPropeyBase,
    t.partial({ '@_xsi:type': t.literal('Chip5152RGBVExtendPropey') }),
  ],
  'Chip5152RGBVExtendPropey'
);
export interface Chip5152RGBVExtendPropey extends t.TypeOf<typeof Chip5152RGBVExtendPropey> {
  RedProperty?: Chip5152ExtendProperty;
  GreenProperty?: Chip5152ExtendProperty;
  BlueProperty?: Chip5152ExtendProperty;
  VRedProperty?: Chip5152ExtendProperty;
}
