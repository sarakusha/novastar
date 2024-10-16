import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipHBS1910ExtendProperty } from './ChipHBS1910ExtendProperty';
 // import
export const ChipHBS1910RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipHBS1910ExtendProperty, // #1180
      GreenProperty: ChipHBS1910ExtendProperty, // #1182
      BlueProperty: ChipHBS1910ExtendProperty, // #1184
      VRedProperty: ChipHBS1910ExtendProperty, // #1186
      IsAdvancedMode: common.Bool, // #1192
      IsUseNewModule: common.Bool, // #1204
      ChipLibVersion: common.UInt8, // #1206
    }),
  ],
  'ChipHBS1910RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipHBS1910RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHBS1910.decompiled.cs:1173
 */
export const ChipHBS1910RGBVExtendProperty = t.intersection(
  [
    ChipHBS1910RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHBS1910RGBVExtendProperty') }),
  ],
  'ChipHBS1910RGBVExtendProperty'
);
export interface ChipHBS1910RGBVExtendProperty
  extends t.TypeOf<typeof ChipHBS1910RGBVExtendProperty> {
  RedProperty?: ChipHBS1910ExtendProperty;
  GreenProperty?: ChipHBS1910ExtendProperty;
  BlueProperty?: ChipHBS1910ExtendProperty;
  VRedProperty?: ChipHBS1910ExtendProperty;
}
