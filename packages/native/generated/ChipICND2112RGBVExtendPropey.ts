import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICND2112ExtendProperty } from './ChipICND2112ExtendProperty';
 // import
export const ChipICND2112RGBVExtendPropeyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipICND2112ExtendProperty, // #171
      GreenProperty: ChipICND2112ExtendProperty, // #173
      BlueProperty: ChipICND2112ExtendProperty, // #175
      VRedProperty: ChipICND2112ExtendProperty, // #177
      IsAdvancedMode: common.Bool, // #233
      MaxUnitChipPerScan: common.Int32, // #245
    }),
  ],
  'ChipICND2112RGBVExtendPropeyBase'
);
/**
 * Codec for {@link ChipICND2112RGBVExtendPropey}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2112.decompiled.cs:164
 */
export const ChipICND2112RGBVExtendPropey = t.intersection(
  [
    ChipICND2112RGBVExtendPropeyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2112RGBVExtendPropey') }),
  ],
  'ChipICND2112RGBVExtendPropey'
);
export interface ChipICND2112RGBVExtendPropey
  extends t.TypeOf<typeof ChipICND2112RGBVExtendPropey> {
  RedProperty?: ChipICND2112ExtendProperty;
  GreenProperty?: ChipICND2112ExtendProperty;
  BlueProperty?: ChipICND2112ExtendProperty;
  VRedProperty?: ChipICND2112ExtendProperty;
}
