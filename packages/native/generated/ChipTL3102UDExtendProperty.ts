import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipTL3102UDExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_7, // #48
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({}),
  ],
  'ChipTL3102UDExtendPropertyBase'
);
/**
 * Codec for {@link ChipTL3102UDExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipTL3102UD.decompiled.cs:45
 */
export const ChipTL3102UDExtendProperty = t.intersection(
  [
    ChipTL3102UDExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTL3102UDExtendProperty') }),
  ],
  'ChipTL3102UDExtendProperty'
);
export interface ChipTL3102UDExtendProperty extends t.TypeOf<typeof ChipTL3102UDExtendProperty> {}
