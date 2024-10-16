import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI525ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegValueConfigFirst: common.withDefault(common.UInt16, 60735), // #57319
      LowCompsention: common.Bool_true, // #57332
      RefreshUp: common.Bool_true, // #57345
      GhostStall: common.Int32_11, // #57358
      GhostModle: common.Int32_1,
    }),
    t.partial({
      SettingNoise: common.Int32,
    }),
  ],
  'ChipMBI525ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI525ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:57305
 */
export const ChipMBI525ExtendProperty = t.intersection(
  [
    ChipMBI525ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI525ExtendProperty') }),
  ],
  'ChipMBI525ExtendProperty'
);
export interface ChipMBI525ExtendProperty extends t.TypeOf<typeof ChipMBI525ExtendProperty> {}
