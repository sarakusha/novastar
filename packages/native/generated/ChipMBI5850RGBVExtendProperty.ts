import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI5850CustomExtendProperty } from './ChipMBI5850CustomExtendProperty'; // import
import { ChipMBI5850ExtendProperty } from './ChipMBI5850ExtendProperty';
 // import
export const ChipMBI5850RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IsAdvancedMode: common.Bool_true,
    }),
    t.partial({
      ChipMBI5850ExtendProperty, // #272
      ChipMBI5850CustomExtendProperty, // #274
      IsUseNewModule: common.Bool, // #293
      SpecialDataLen: common.Int32, // #295
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipMBI5850RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5850RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5850.decompiled.cs:269
 */
export const ChipMBI5850RGBVExtendProperty = t.intersection(
  [
    ChipMBI5850RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5850RGBVExtendProperty') }),
  ],
  'ChipMBI5850RGBVExtendProperty'
);
export interface ChipMBI5850RGBVExtendProperty
  extends t.TypeOf<typeof ChipMBI5850RGBVExtendProperty> {
  ChipMBI5850ExtendProperty?: ChipMBI5850ExtendProperty;
  ChipMBI5850CustomExtendProperty?: ChipMBI5850CustomExtendProperty;
}
