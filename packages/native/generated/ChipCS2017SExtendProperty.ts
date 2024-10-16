import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCS2017SExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      FirstRegistor: common.UInt16_7936,
    }),
    t.partial({
      LineEliminationEnable: common.Bool, // #53
      ShadowEliminationLevel: common.UInt8, // #66
      ResponseSpeed: common.UInt8, // #79
      WorkMode: common.UInt8, // #92
      SetCurrentPosition: common.UInt8, // #104
      InflectionCurrent: common.UInt8, // #117
      DMAWriteMode: common.UInt8, // #130
      CurrentGain: common.UInt8,
    }),
  ],
  'ChipCS2017SExtendPropertyBase'
);
/**
 * Codec for {@link ChipCS2017SExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCS2017S.decompiled.cs:47
 */
export const ChipCS2017SExtendProperty = t.intersection(
  [
    ChipCS2017SExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCS2017SExtendProperty') }),
  ],
  'ChipCS2017SExtendProperty'
);
export interface ChipCS2017SExtendProperty extends t.TypeOf<typeof ChipCS2017SExtendProperty> {}
