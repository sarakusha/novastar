import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5759CustomExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      ScanData: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({}),
  ],
  'ChipMBI5759CustomExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5759CustomExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5759.decompiled.cs:1367
 */
export const ChipMBI5759CustomExtendProperty = t.intersection(
  [
    ChipMBI5759CustomExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5759CustomExtendProperty') }),
  ],
  'ChipMBI5759CustomExtendProperty'
);
export interface ChipMBI5759CustomExtendProperty
  extends t.TypeOf<typeof ChipMBI5759CustomExtendProperty> {}
