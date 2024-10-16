import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipDM413ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      FirstReg: common.UInt16, // #41
      IsUseNewModule: common.Bool, // #43
      ChipLibVersion: common.UInt8, // #45
    }),
  ],
  'ChipDM413ExtendPropertyBase'
);
/**
 * Codec for {@link ChipDM413ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDM413.decompiled.cs:39
 */
export const ChipDM413ExtendProperty = t.intersection(
  [ChipDM413ExtendPropertyBase, t.partial({ '@_xsi:type': t.literal('ChipDM413ExtendProperty') })],
  'ChipDM413ExtendProperty'
);
export interface ChipDM413ExtendProperty extends t.TypeOf<typeof ChipDM413ExtendProperty> {}
