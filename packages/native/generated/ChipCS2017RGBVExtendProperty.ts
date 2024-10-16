import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCS2017ExtendProperty } from './ChipCS2017ExtendProperty';
 // import
export const ChipCS2017RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipCS2017ExtendProperty, // #188
      GreenProperty: ChipCS2017ExtendProperty, // #190
      BlueProperty: ChipCS2017ExtendProperty, // #192
      VRedProperty: ChipCS2017ExtendProperty, // #194
      IsAdvancedMode: common.Bool, // #202
      IsUseNewModule: common.Bool, // #214
      FirstDataLen: common.Int32, // #216
      FirstStartIndex: common.Int32, // #218
      FirstRegisterAddr: common.Int32, // #220
      ConfigDataLen: common.Int32, // #222
    }),
  ],
  'ChipCS2017RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCS2017RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCS2017.decompiled.cs:181
 */
export const ChipCS2017RGBVExtendProperty = t.intersection(
  [
    ChipCS2017RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCS2017RGBVExtendProperty') }),
  ],
  'ChipCS2017RGBVExtendProperty'
);
export interface ChipCS2017RGBVExtendProperty
  extends t.TypeOf<typeof ChipCS2017RGBVExtendProperty> {
  RedProperty?: ChipCS2017ExtendProperty;
  GreenProperty?: ChipCS2017ExtendProperty;
  BlueProperty?: ChipCS2017ExtendProperty;
  VRedProperty?: ChipCS2017ExtendProperty;
}
