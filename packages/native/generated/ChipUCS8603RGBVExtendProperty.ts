import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipUCS8603RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IsOpenChannelCheck: common.Bool_false,
    }),
    t.partial({
      RedFirstReg1: common.UInt16, // #59
      GreenFirstReg1: common.UInt16, // #61
      BlueFirstReg1: common.UInt16, // #63
      VRedFirstReg1: common.UInt16, // #65
      RedFirstReg2: common.UInt16, // #67
      GreenFirstReg2: common.UInt16, // #69
      BlueFirstReg2: common.UInt16, // #71
      VRedFirstReg2: common.UInt16, // #73
      RedFirstReg3: common.UInt16, // #75
      GreenFirstReg3: common.UInt16, // #77
      BlueFirstReg3: common.UInt16, // #79
      VRedFirstReg3: common.UInt16, // #81
      IsUseNewModule: common.Bool, // #83
      ChipLibVersion: common.UInt8, // #85
      FirstDataLen: common.Int32, // #87
      FirstStartIndex: common.Int32, // #89
      FirstRegisterAddr: common.Int32, // #91
      SecondDataLen: common.Int32, // #93
      SecondStartIndex: common.Int32, // #95
      SecondRegisterAddr: common.Int32, // #97
      ThirdDataLen: common.Int32, // #99
      ThirdDataStartIndex: common.Int32, // #101
      ThirdRegisterAddr: common.Int32, // #103
      IsAdvancedMode: common.Bool, // #105
      GrayDepth: common.UInt16, // #117
      WorkingMode: common.UInt16, // #147
      UCS8603_T1L: common.UInt16, // #159
      UCS8603_T0L: common.UInt16, // #171
      UCS8603_T: common.UInt16,
    }),
  ],
  'ChipUCS8603RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipUCS8603RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipUCS8603.decompiled.cs:46
 */
export const ChipUCS8603RGBVExtendProperty = t.intersection(
  [
    ChipUCS8603RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipUCS8603RGBVExtendProperty') }),
  ],
  'ChipUCS8603RGBVExtendProperty'
);
export interface ChipUCS8603RGBVExtendProperty
  extends t.TypeOf<typeof ChipUCS8603RGBVExtendProperty> {}
