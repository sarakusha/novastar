import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSM16136ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      BlankingEnable: common.Bool, // #60199
      BlankingVoltage: common.UInt8, // #60212
      LowImproveValue: common.UInt16, // #60225
      LowImproveEnable: common.Bool, // #60238
    }),
  ],
  'ChipSM16136ExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16136ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:60189
 */
export const ChipSM16136ExtendProperty = t.intersection(
  [
    ChipSM16136ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16136ExtendProperty') }),
  ],
  'ChipSM16136ExtendProperty'
);
export interface ChipSM16136ExtendProperty extends t.TypeOf<typeof ChipSM16136ExtendProperty> {}
