import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipFM6182ExtendProperty } from './ChipFM6182ExtendProperty';
 // import
export const ChipFM6182RGBVExtendPropeyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipFM6182ExtendProperty, // #57663
      GreenProperty: ChipFM6182ExtendProperty, // #57665
      BlueProperty: ChipFM6182ExtendProperty, // #57667
      VRedProperty: ChipFM6182ExtendProperty, // #57669
      IsAdvancedMode: common.Bool, // #57673
    }),
  ],
  'ChipFM6182RGBVExtendPropeyBase'
);
/**
 * Codec for {@link ChipFM6182RGBVExtendPropey}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:57661
 */
export const ChipFM6182RGBVExtendPropey = t.intersection(
  [
    ChipFM6182RGBVExtendPropeyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6182RGBVExtendPropey') }),
  ],
  'ChipFM6182RGBVExtendPropey'
);
export interface ChipFM6182RGBVExtendPropey extends t.TypeOf<typeof ChipFM6182RGBVExtendPropey> {
  RedProperty?: ChipFM6182ExtendProperty;
  GreenProperty?: ChipFM6182ExtendProperty;
  BlueProperty?: ChipFM6182ExtendProperty;
  VRedProperty?: ChipFM6182ExtendProperty;
}
