import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5043ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      GCLKShift: common.UInt8, // #57052
      SelectChargeMode: common.UInt8, // #57065
      ColorShiftCompensation: common.UInt8, // #57078
      GCLKRising: common.Bool, // #57091
      EnableCharge: common.Bool, // #57104
    }),
  ],
  'ChipMBI5043ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5043ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:57040
 */
export const ChipMBI5043ExtendProperty = t.intersection(
  [
    ChipMBI5043ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5043ExtendProperty') }),
  ],
  'ChipMBI5043ExtendProperty'
);
export interface ChipMBI5043ExtendProperty extends t.TypeOf<typeof ChipMBI5043ExtendProperty> {}
