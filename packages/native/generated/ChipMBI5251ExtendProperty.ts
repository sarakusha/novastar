import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5251ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      Reg_First: common.withDefault(common.UInt16, 1819), // #1083
      Reg_Second: common.withDefault(common.UInt16, 1536), // #1086
      Reg_Third: common.UInt16_65535, // #1089
      Reg_Fourth: common.UInt16_65535, // #1092
      Reg_Fifth: common.withDefault(common.UInt16, 28959), // #1095
      Reg_Sixth: common.withDefault(common.UInt16, 320),
    }),
    t.partial({}),
  ],
  'ChipMBI5251ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5251ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5251.decompiled.cs:1080
 */
export const ChipMBI5251ExtendProperty = t.intersection(
  [
    ChipMBI5251ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5251ExtendProperty') }),
  ],
  'ChipMBI5251ExtendProperty'
);
export interface ChipMBI5251ExtendProperty extends t.TypeOf<typeof ChipMBI5251ExtendProperty> {}
