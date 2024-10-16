import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipXM11202GRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt64, 'ulong'), // #970
      ConfigRegisterNum: common.Int32_16, // #1050
      IsAdvancedMode: common.Bool_true,
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #1062
      SpecialDataLen: common.Int32, // #1437
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipXM11202GRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipXM11202GRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipXM11202G.decompiled.cs:959
 */
export const ChipXM11202GRGBVExtendProperty = t.intersection(
  [
    ChipXM11202GRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipXM11202GRGBVExtendProperty') }),
  ],
  'ChipXM11202GRGBVExtendProperty'
);
export interface ChipXM11202GRGBVExtendProperty
  extends t.TypeOf<typeof ChipXM11202GRGBVExtendProperty> {}
