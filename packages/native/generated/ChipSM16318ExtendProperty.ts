import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSM16318ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_7, // #1929
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      FirstRegValue: common.UInt16,
    }),
  ],
  'ChipSM16318ExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16318ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16318.decompiled.cs:1926
 */
export const ChipSM16318ExtendProperty = t.intersection(
  [
    ChipSM16318ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16318ExtendProperty') }),
  ],
  'ChipSM16318ExtendProperty'
);
export interface ChipSM16318ExtendProperty extends t.TypeOf<typeof ChipSM16318ExtendProperty> {}
