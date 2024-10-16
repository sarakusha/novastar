import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMY9862ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      CompensationMode: common.Bool, // #58283
      LowAshImprovement: common.UInt8, // #58296
      FirstSweepCompensation: common.UInt8, // #58309
      EliminateGhostingSet: common.UInt8, // #58322
    }),
  ],
  'ChipMY9862ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMY9862ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:58273
 */
export const ChipMY9862ExtendProperty = t.intersection(
  [
    ChipMY9862ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMY9862ExtendProperty') }),
  ],
  'ChipMY9862ExtendProperty'
);
export interface ChipMY9862ExtendProperty extends t.TypeOf<typeof ChipMY9862ExtendProperty> {}
