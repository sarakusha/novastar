import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipHX8055ExtendProperty } from './ChipHX8055ExtendProperty';
 // import
export const ChipHX8055RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IsAdvancedMode: common.Bool_true,
    }),
    t.partial({
      RedProperty: ChipHX8055ExtendProperty, // #1789
      GreenProperty: ChipHX8055ExtendProperty, // #1791
      BlueProperty: ChipHX8055ExtendProperty, // #1793
      VRedProperty: ChipHX8055ExtendProperty, // #1795
      IsUseNewModule: common.Bool,
    }),
  ],
  'ChipHX8055RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipHX8055RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHX8055.decompiled.cs:1782
 */
export const ChipHX8055RGBVExtendProperty = t.intersection(
  [
    ChipHX8055RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHX8055RGBVExtendProperty') }),
  ],
  'ChipHX8055RGBVExtendProperty'
);
export interface ChipHX8055RGBVExtendProperty
  extends t.TypeOf<typeof ChipHX8055RGBVExtendProperty> {
  RedProperty?: ChipHX8055ExtendProperty;
  GreenProperty?: ChipHX8055ExtendProperty;
  BlueProperty?: ChipHX8055ExtendProperty;
  VRedProperty?: ChipHX8055ExtendProperty;
}
