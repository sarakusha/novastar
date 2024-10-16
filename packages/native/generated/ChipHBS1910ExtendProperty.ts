import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipHBS1910ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RegFirst: common.UInt16, // #1122
      RegSecond: common.UInt16, // #1124
      IsUseNewModule: common.Bool, // #1126
      ChipLibVersion: common.UInt8, // #1128
      Gain: common.UInt16, // #1130
    }),
  ],
  'ChipHBS1910ExtendPropertyBase'
);
/**
 * Codec for {@link ChipHBS1910ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHBS1910.decompiled.cs:1119
 */
export const ChipHBS1910ExtendProperty = t.intersection(
  [
    ChipHBS1910ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHBS1910ExtendProperty') }),
  ],
  'ChipHBS1910ExtendProperty'
);
export interface ChipHBS1910ExtendProperty extends t.TypeOf<typeof ChipHBS1910ExtendProperty> {}
