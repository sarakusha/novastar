import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCS2017ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      FirstRegistor: common.UInt16_7936,
    }),
    t.partial({
      LineEliminationEnable: common.Bool, // #50
      ShadowEliminationLevel: common.UInt8, // #63
      ResponseSpeed: common.UInt8, // #76
      WorkMode: common.UInt8, // #89
      SetCurrentPosition: common.UInt8, // #101
      InflectionCurrent: common.UInt8, // #114
      DMAWriteMode: common.UInt8, // #127
      CurrentGain: common.UInt8,
    }),
  ],
  'ChipCS2017ExtendPropertyBase'
);
/**
 * Codec for {@link ChipCS2017ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCS2017.decompiled.cs:44
 */
export const ChipCS2017ExtendProperty = t.intersection(
  [
    ChipCS2017ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCS2017ExtendProperty') }),
  ],
  'ChipCS2017ExtendProperty'
);
export interface ChipCS2017ExtendProperty extends t.TypeOf<typeof ChipCS2017ExtendProperty> {}
