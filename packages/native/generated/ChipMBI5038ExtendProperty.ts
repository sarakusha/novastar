import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5038ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      ThermalShutdown: common.Bool_true,
    }),
    t.partial({
      SwitchSpeed: common.Bool, // #56755
      CurrentSelection: common.UInt8, // #56768
      PowerMode: common.Bool,
    }),
  ],
  'ChipMBI5038ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5038ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:56745
 */
export const ChipMBI5038ExtendProperty = t.intersection(
  [
    ChipMBI5038ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5038ExtendProperty') }),
  ],
  'ChipMBI5038ExtendProperty'
);
export interface ChipMBI5038ExtendProperty extends t.TypeOf<typeof ChipMBI5038ExtendProperty> {}
