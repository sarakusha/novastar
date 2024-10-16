import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipXM11920GRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt64, 'ulong'), // #954
      ConfigRegisterNum: common.Int32_16, // #1034
      IsAdvancedMode: common.Bool_true,
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #1046
      SpecialDataLen: common.Int32, // #1421
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipXM11920GRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipXM11920GRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipXM11920G.decompiled.cs:943
 */
export const ChipXM11920GRGBVExtendProperty = t.intersection(
  [
    ChipXM11920GRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipXM11920GRGBVExtendProperty') }),
  ],
  'ChipXM11920GRGBVExtendProperty'
);
export interface ChipXM11920GRGBVExtendProperty
  extends t.TypeOf<typeof ChipXM11920GRGBVExtendProperty> {}
