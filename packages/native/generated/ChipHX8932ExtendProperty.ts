import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipHX8932ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #2360
      ChipLibVersion: common.UInt8, // #2362
      FirstRegValue: common.Int32, // #2364
      SecondRegValue: common.Int32, // #2366
      CurrentGain: common.UInt8, // #2368
      OutputVolt: common.UInt8, // #2380
      LowGreyColor: common.UInt8, // #2392
      ShadowLevel: common.UInt8, // #2404
      Reserved: common.UInt8,
    }),
  ],
  'ChipHX8932ExtendPropertyBase'
);
/**
 * Codec for {@link ChipHX8932ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHX8932.decompiled.cs:2353
 */
export const ChipHX8932ExtendProperty = t.intersection(
  [
    ChipHX8932ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHX8932ExtendProperty') }),
  ],
  'ChipHX8932ExtendProperty'
);
export interface ChipHX8932ExtendProperty extends t.TypeOf<typeof ChipHX8932ExtendProperty> {}
