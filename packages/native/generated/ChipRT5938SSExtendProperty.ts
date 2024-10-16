import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipRT5938SSExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #4217
      ChipLibVersion: common.UInt8, // #4219
      EliminationLevel: common.UInt8, // #4221
      EliminateEnable: common.Bool, // #4233
      OpenCircuitLevel: common.UInt8, // #4245
      ShortCircuitLevel: common.UInt8, // #4257
      SlowOpen: common.Bool, // #4269
      PowerSavingModeEn: common.Bool, // #4281
      CurrentGain: common.UInt16,
    }),
  ],
  'ChipRT5938SSExtendPropertyBase'
);
/**
 * Codec for {@link ChipRT5938SSExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipRT5938SS.decompiled.cs:4212
 */
export const ChipRT5938SSExtendProperty = t.intersection(
  [
    ChipRT5938SSExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipRT5938SSExtendProperty') }),
  ],
  'ChipRT5938SSExtendProperty'
);
export interface ChipRT5938SSExtendProperty extends t.TypeOf<typeof ChipRT5938SSExtendProperty> {}
