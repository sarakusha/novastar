import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipHX5011RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IsOpenChannelCheck: common.Bool_false,
    }),
    t.partial({
      RedFirstReg1: common.UInt16, // #816
      GreenFirstReg1: common.UInt16, // #818
      BlueFirstReg1: common.UInt16, // #820
      VRedFirstReg1: common.UInt16, // #822
      RedFirstReg2: common.UInt16, // #824
      GreenFirstReg2: common.UInt16, // #826
      BlueFirstReg2: common.UInt16, // #828
      VRedFirstReg2: common.UInt16, // #832
      IsUseNewModule: common.Bool, // #844
      FirstDataLen: common.Int32, // #846
      FirstStartIndex: common.Int32, // #848
      FirstRegisterAddr: common.Int32, // #850
      SecondDataLen: common.Int32, // #852
      SecondStartIndex: common.Int32, // #854
      SecondRegisterAddr: common.Int32, // #856
      IsAdvancedMode: common.Bool, // #858
      RefreshRate: common.UInt8, // #870
      WorkPattern: common.Bool,
    }),
  ],
  'ChipHX5011RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipHX5011RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHX5011.decompiled.cs:803
 */
export const ChipHX5011RGBVExtendProperty = t.intersection(
  [
    ChipHX5011RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHX5011RGBVExtendProperty') }),
  ],
  'ChipHX5011RGBVExtendProperty'
);
export interface ChipHX5011RGBVExtendProperty
  extends t.TypeOf<typeof ChipHX5011RGBVExtendProperty> {}
