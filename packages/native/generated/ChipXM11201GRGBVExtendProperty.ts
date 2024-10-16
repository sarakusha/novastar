import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipXM11201GRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt64, 'ulong'), // #959
      ConfigRegisterNum: common.Int32_16, // #1039
      IsAdvancedMode: common.Bool_true,
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #1051
      SpecialDataLen: common.Int32, // #1426
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipXM11201GRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipXM11201GRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipXM11201G.decompiled.cs:948
 */
export const ChipXM11201GRGBVExtendProperty = t.intersection(
  [
    ChipXM11201GRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipXM11201GRGBVExtendProperty') }),
  ],
  'ChipXM11201GRGBVExtendProperty'
);
export interface ChipXM11201GRGBVExtendProperty
  extends t.TypeOf<typeof ChipXM11201GRGBVExtendProperty> {}
