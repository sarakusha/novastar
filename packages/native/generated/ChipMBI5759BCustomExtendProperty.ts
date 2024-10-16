import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5759BCustomExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      ScanData: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({}),
  ],
  'ChipMBI5759BCustomExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5759BCustomExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5759B.decompiled.cs:517
 */
export const ChipMBI5759BCustomExtendProperty = t.intersection(
  [
    ChipMBI5759BCustomExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5759BCustomExtendProperty') }),
  ],
  'ChipMBI5759BCustomExtendProperty'
);
export interface ChipMBI5759BCustomExtendProperty
  extends t.TypeOf<typeof ChipMBI5759BCustomExtendProperty> {}
