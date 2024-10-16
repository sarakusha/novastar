import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipNT27003ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_196, // #43
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      FirstRegValue: common.UInt16, // #47
      SecondRegValue: common.UInt16,
    }),
  ],
  'ChipNT27003ExtendPropertyBase'
);
/**
 * Codec for {@link ChipNT27003ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipNT27003.decompiled.cs:40
 */
export const ChipNT27003ExtendProperty = t.intersection(
  [
    ChipNT27003ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipNT27003ExtendProperty') }),
  ],
  'ChipNT27003ExtendProperty'
);
export interface ChipNT27003ExtendProperty extends t.TypeOf<typeof ChipNT27003ExtendProperty> {}
