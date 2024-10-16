import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSUM2028ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      ColorCompensate: common.Int32_4, // #62518
      UpdataType: common.Bool_true, // #62531
      OEType: common.Bool_true, // #62557
      SetDisapparate: common.UInt8_1,
    }),
    t.partial({
      SetFrequency: common.UInt8, // #62544
      SetConstantCurrent: common.UInt8,
    }),
  ],
  'ChipSUM2028ExtendPropertyBase'
);
/**
 * Codec for {@link ChipSUM2028ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:62491
 */
export const ChipSUM2028ExtendProperty = t.intersection(
  [
    ChipSUM2028ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSUM2028ExtendProperty') }),
  ],
  'ChipSUM2028ExtendProperty'
);
export interface ChipSUM2028ExtendProperty extends t.TypeOf<typeof ChipSUM2028ExtendProperty> {}
