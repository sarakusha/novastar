import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipTLC6983ExtendProperty } from './ChipTLC6983ExtendProperty';
 // import
export const ChipTLC6983RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_12,
    }),
    t.partial({
      ExtendProperty: ChipTLC6983ExtendProperty, // #3221
      TempSubField: common.UInt8, // #3223
      TempICNum: common.UInt8, // #3225
      TempGclkFreqR: common.UInt8, // #3227
      TempBit3: common.UInt8, // #3229
      SubField: common.UInt8, // #3250
      GclkFreqR: common.UInt8, // #3262
      Bit3: common.UInt8, // #3274
      ICNum: common.UInt8, // #3286
      PWMNum: common.UInt16, // #3298
      HHGCLKNum: common.UInt8, // #3311
      IsAdvancedMode: common.Bool, // #3324
      IsUseNewModule: common.Bool, // #3336
      SpecialDataLen: common.Int32, // #3338
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipTLC6983RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipTLC6983RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipTLC6983.decompiled.cs:3216
 */
export const ChipTLC6983RGBVExtendProperty = t.intersection(
  [
    ChipTLC6983RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTLC6983RGBVExtendProperty') }),
  ],
  'ChipTLC6983RGBVExtendProperty'
);
export interface ChipTLC6983RGBVExtendProperty
  extends t.TypeOf<typeof ChipTLC6983RGBVExtendProperty> {
  ExtendProperty?: ChipTLC6983ExtendProperty;
}
