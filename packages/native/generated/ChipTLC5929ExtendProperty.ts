import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipTLC5929ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IDMWorkTime: common.UInt8_3,
    }),
    t.partial({
      IsPowerMode: common.Bool, // #60544
      IDMWorkCurrent: common.UInt8, // #60570
      InspectionType: common.UInt8,
    }),
  ],
  'ChipTLC5929ExtendPropertyBase'
);
/**
 * Codec for {@link ChipTLC5929ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:60534
 */
export const ChipTLC5929ExtendProperty = t.intersection(
  [
    ChipTLC5929ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTLC5929ExtendProperty') }),
  ],
  'ChipTLC5929ExtendProperty'
);
export interface ChipTLC5929ExtendProperty extends t.TypeOf<typeof ChipTLC5929ExtendProperty> {}
