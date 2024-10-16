import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipRT5938SS_ComExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #2120
      ChipLibVersion: common.UInt8, // #2122
      EliminationLevel: common.UInt8, // #2124
      EliminateEnable: common.Bool, // #2136
      OpenCircuitLevel: common.UInt8, // #2152
      ShortCircuitLevel: common.UInt8, // #2164
      PowerSavingModeEn: common.Bool, // #2176
      SlowOpen: common.Bool, // #2192
      CurrentGain: common.UInt16,
    }),
  ],
  'ChipRT5938SS_ComExtendPropertyBase'
);
/**
 * Codec for {@link ChipRT5938SS_ComExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipRT5938SS_Common.decompiled.cs:2115
 */
export const ChipRT5938SS_ComExtendProperty = t.intersection(
  [
    ChipRT5938SS_ComExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipRT5938SS_ComExtendProperty') }),
  ],
  'ChipRT5938SS_ComExtendProperty'
);
export interface ChipRT5938SS_ComExtendProperty
  extends t.TypeOf<typeof ChipRT5938SS_ComExtendProperty> {}
