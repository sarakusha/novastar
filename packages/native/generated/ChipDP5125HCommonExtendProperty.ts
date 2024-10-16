import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipDP5125HCommonExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      FirstRegValue: common.UInt16, // #49
      CurrentGain: common.UInt16, // #51
    }),
  ],
  'ChipDP5125HCommonExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP5125HCommonExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP5125HCommon.decompiled.cs:46
 */
export const ChipDP5125HCommonExtendProperty = t.intersection(
  [
    ChipDP5125HCommonExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP5125HCommonExtendProperty') }),
  ],
  'ChipDP5125HCommonExtendProperty'
);
export interface ChipDP5125HCommonExtendProperty
  extends t.TypeOf<typeof ChipDP5125HCommonExtendProperty> {}
