import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMY9263ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      EnResetAPDMOrPWM: common.Bool_true, // #56892
      EnManualSyc: common.Bool_true,
    }),
    t.partial({
      ModeSelecte: common.Bool, // #56853
      PowerSavingMode: common.Bool, // #56866
      GclkMonitor: common.Bool, // #56905
      GclkPrivider: common.Bool, // #56918
      EnAutoCloseChannel: common.Bool, // #56931
      LedThreadType: common.UInt8,
    }),
  ],
  'ChipMY9263ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMY9263ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:56835
 */
export const ChipMY9263ExtendProperty = t.intersection(
  [
    ChipMY9263ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMY9263ExtendProperty') }),
  ],
  'ChipMY9263ExtendProperty'
);
export interface ChipMY9263ExtendProperty extends t.TypeOf<typeof ChipMY9263ExtendProperty> {}
