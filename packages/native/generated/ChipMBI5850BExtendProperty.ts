import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5850BExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #2588
      ChipLibVersion: common.UInt8,
    }),
  ],
  'ChipMBI5850BExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5850BExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5850B.decompiled.cs:2583
 */
export const ChipMBI5850BExtendProperty = t.intersection(
  [
    ChipMBI5850BExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5850BExtendProperty') }),
  ],
  'ChipMBI5850BExtendProperty'
);
export interface ChipMBI5850BExtendProperty extends t.TypeOf<typeof ChipMBI5850BExtendProperty> {}
