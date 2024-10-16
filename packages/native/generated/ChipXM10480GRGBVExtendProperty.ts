import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipXM10480GRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt64, 'ulong'), // #992
      ConfigRegisterNum: common.Int32_16, // #1018
      IsAdvancedMode: common.Bool_true,
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #934
      GrayCount: common.UInt8, // #1030
      RRemovePointDectLevel: common.UInt8, // #1444
      SpecialDataLen: common.Int32, // #1558
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipXM10480GRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipXM10480GRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipXM10480G.decompiled.cs:923
 */
export const ChipXM10480GRGBVExtendProperty = t.intersection(
  [
    ChipXM10480GRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipXM10480GRGBVExtendProperty') }),
  ],
  'ChipXM10480GRGBVExtendProperty'
);
export interface ChipXM10480GRGBVExtendProperty
  extends t.TypeOf<typeof ChipXM10480GRGBVExtendProperty> {}
