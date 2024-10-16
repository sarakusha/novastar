import * as t from 'io-ts';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI524ExtendProperty } from './ChipMBI524ExtendProperty';
 // import
export const Chip5124RGBVExtendPropeyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipMBI524ExtendProperty, // #57859
      GreenProperty: ChipMBI524ExtendProperty, // #57861
      BlueProperty: ChipMBI524ExtendProperty, // #57863
      VRedProperty: ChipMBI524ExtendProperty, // #57865
    }),
  ],
  'Chip5124RGBVExtendPropeyBase'
);
/**
 * Codec for {@link Chip5124RGBVExtendPropey}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:57857
 */
export const Chip5124RGBVExtendPropey = t.intersection(
  [
    Chip5124RGBVExtendPropeyBase,
    t.partial({ '@_xsi:type': t.literal('Chip5124RGBVExtendPropey') }),
  ],
  'Chip5124RGBVExtendPropey'
);
export interface Chip5124RGBVExtendPropey extends t.TypeOf<typeof Chip5124RGBVExtendPropey> {
  RedProperty?: ChipMBI524ExtendProperty;
  GreenProperty?: ChipMBI524ExtendProperty;
  BlueProperty?: ChipMBI524ExtendProperty;
  VRedProperty?: ChipMBI524ExtendProperty;
}
