import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipNT27002SExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_196, // #921
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      FirstRegValue: common.UInt16, // #925
      SecondRegValue: common.UInt16,
    }),
  ],
  'ChipNT27002SExtendPropertyBase'
);
/**
 * Codec for {@link ChipNT27002SExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipNT27002S.decompiled.cs:918
 */
export const ChipNT27002SExtendProperty = t.intersection(
  [
    ChipNT27002SExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipNT27002SExtendProperty') }),
  ],
  'ChipNT27002SExtendProperty'
);
export interface ChipNT27002SExtendProperty extends t.TypeOf<typeof ChipNT27002SExtendProperty> {}
