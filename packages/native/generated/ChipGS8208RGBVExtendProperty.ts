import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipGS8208RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedFirstReg1: common.UInt16, // #51
      GreenFirstReg1: common.UInt16, // #53
      BlueFirstReg1: common.UInt16, // #55
      VRedFirstReg1: common.UInt16, // #57
      RedFirstReg2: common.UInt16, // #59
      GreenFirstReg2: common.UInt16, // #61
      BlueFirstReg2: common.UInt16, // #63
      VRedFirstReg2: common.UInt16, // #65
      RedFirstReg3: common.UInt16, // #67
      GreenFirstReg3: common.UInt16, // #69
      BlueFirstReg3: common.UInt16, // #71
      VRedFirstReg3: common.UInt16, // #73
      IsUseNewModule: common.Bool, // #75
      ChipLibVersion: common.UInt8, // #77
      FirstDataLen: common.Int32, // #79
      FirstStartIndex: common.Int32, // #81
      FirstRegisterAddr: common.Int32, // #83
      SecondDataLen: common.Int32, // #85
      SecondStartIndex: common.Int32, // #87
      SecondRegisterAddr: common.Int32, // #89
      ThirdDataLen: common.Int32, // #91
      ThirdDataStartIndex: common.Int32, // #93
      ThirdRegisterAddr: common.Int32, // #95
      IsAdvancedMode: common.Bool, // #97
      RedGian: common.UInt16, // #109
      GreenGian: common.UInt16, // #122
      BlueGian: common.UInt16, // #135
      BitLevel: common.UInt16, // #148
      OpenGain: common.Bool, // #161
      IsOpenDoubleChannel: common.Bool, // #173
      GS8208_T1L: common.UInt16, // #185
      GS8208_T0L: common.UInt16, // #197
      GS8208_T: common.UInt16, // #209
      CommonGain: common.Int32, // #221
    }),
  ],
  'ChipGS8208RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipGS8208RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipGS8208.decompiled.cs:44
 */
export const ChipGS8208RGBVExtendProperty = t.intersection(
  [
    ChipGS8208RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipGS8208RGBVExtendProperty') }),
  ],
  'ChipGS8208RGBVExtendProperty'
);
export interface ChipGS8208RGBVExtendProperty
  extends t.TypeOf<typeof ChipGS8208RGBVExtendProperty> {}
