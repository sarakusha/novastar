import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipDP5125HExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      FirstRegValue: common.UInt16, // #51
      CurrentGain: common.UInt16, // #53
    }),
  ],
  'ChipDP5125HExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP5125HExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP5125H.decompiled.cs:48
 */
export const ChipDP5125HExtendProperty = t.intersection(
  [
    ChipDP5125HExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP5125HExtendProperty') }),
  ],
  'ChipDP5125HExtendProperty'
);
export interface ChipDP5125HExtendProperty extends t.TypeOf<typeof ChipDP5125HExtendProperty> {}
