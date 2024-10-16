import * as t from 'io-ts';
import { Chip5153ExtendProperty } from './Chip5153ExtendProperty'; // import
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const Chip5153RGBVExtendPropeyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: Chip5153ExtendProperty, // #43262
      GreenProperty: Chip5153ExtendProperty, // #43264
      BlueProperty: Chip5153ExtendProperty, // #43266
      VRedProperty: Chip5153ExtendProperty, // #43268
    }),
  ],
  'Chip5153RGBVExtendPropeyBase'
);
/**
 * Codec for {@link Chip5153RGBVExtendPropey}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:43260
 */
export const Chip5153RGBVExtendPropey = t.intersection(
  [
    Chip5153RGBVExtendPropeyBase,
    t.partial({ '@_xsi:type': t.literal('Chip5153RGBVExtendPropey') }),
  ],
  'Chip5153RGBVExtendPropey'
);
export interface Chip5153RGBVExtendPropey extends t.TypeOf<typeof Chip5153RGBVExtendPropey> {
  RedProperty?: Chip5153ExtendProperty;
  GreenProperty?: Chip5153ExtendProperty;
  BlueProperty?: Chip5153ExtendProperty;
  VRedProperty?: Chip5153ExtendProperty;
}
