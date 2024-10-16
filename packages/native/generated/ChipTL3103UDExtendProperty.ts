import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipTL3103UDExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_15, // #969
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({}),
  ],
  'ChipTL3103UDExtendPropertyBase'
);
/**
 * Codec for {@link ChipTL3103UDExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipTL3103UD.decompiled.cs:966
 */
export const ChipTL3103UDExtendProperty = t.intersection(
  [
    ChipTL3103UDExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTL3103UDExtendProperty') }),
  ],
  'ChipTL3103UDExtendProperty'
);
export interface ChipTL3103UDExtendProperty extends t.TypeOf<typeof ChipTL3103UDExtendProperty> {}
