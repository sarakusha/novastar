import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSUM2017TDExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RedRegValueConfigFirst: common.UInt16_29951, // #65068
      GreenRegValueConfigFirst: common.UInt16_29951, // #65081
      BlueRegValueConfigFirst: common.UInt16_29951,
    }),
    t.partial({
      IsAdvancedMode: common.Bool, // #65094
      VRedRegValueConfigFirst: common.UInt16,
    }),
  ],
  'ChipSUM2017TDExtendPropertyBase'
);
/**
 * Codec for {@link ChipSUM2017TDExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:65043
 */
export const ChipSUM2017TDExtendProperty = t.intersection(
  [
    ChipSUM2017TDExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSUM2017TDExtendProperty') }),
  ],
  'ChipSUM2017TDExtendProperty'
);
export interface ChipSUM2017TDExtendProperty extends t.TypeOf<typeof ChipSUM2017TDExtendProperty> {}
