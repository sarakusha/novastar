import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipXM10486GRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt64, 'ulong'), // #472
      IsAdvancedMode: common.Bool_true,
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #62
      FrameRate: common.Numeric, // #64
      SpecialDataLen: common.Int32, // #66
      SpecialRegisterAddr: common.UInt32, // #68
      RRemovePointDectLevel: common.UInt8, // #265
      RTheFirstDarkCompensation: common.UInt16, // #303
      GTheFirstDarkCompensation: common.UInt16, // #316
      BTheFirstDarkCompensation: common.UInt16, // #329
      RefreshRate: common.UInt16, // #394
      GclkFreqInteger: common.UInt16, // #407
      GclkFreqDecimal: common.UInt16, // #420
      GclkNumber: common.UInt16, // #433
      GrayValue: common.UInt16, // #602
      ConfigRegisterNum: common.Int32,
    }),
  ],
  'ChipXM10486GRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipXM10486GRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipXM10486G.decompiled.cs:53
 */
export const ChipXM10486GRGBVExtendProperty = t.intersection(
  [
    ChipXM10486GRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipXM10486GRGBVExtendProperty') }),
  ],
  'ChipXM10486GRGBVExtendProperty'
);
export interface ChipXM10486GRGBVExtendProperty
  extends t.TypeOf<typeof ChipXM10486GRGBVExtendProperty> {}
