import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipICN3100RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      DormancyMode: common.Bool_false, // #162
      ReturnEn: common.Bool_false,
    }),
    t.partial({
      RedFirstReg2: common.UInt16, // #58
      GreenFirstReg2: common.UInt16, // #60
      BlueFirstReg2: common.UInt16, // #62
      VRedFirstReg2: common.UInt16, // #64
      RedFirstReg3: common.UInt16, // #66
      GreenFirstReg3: common.UInt16, // #68
      BlueFirstReg3: common.UInt16, // #70
      VRedFirstReg3: common.UInt16, // #72
      IsUseNewModule: common.Bool, // #74
      ChipLibVersion: common.UInt8, // #76
      SecondDataLen: common.Int32, // #78
      SecondStartIndex: common.Int32, // #80
      SecondRegisterAddr: common.Int32, // #82
      ThirdDataLen: common.Int32, // #84
      ThirdDataStartIndex: common.Int32, // #86
      ThirdRegisterAddr: common.Int32, // #88
      IsAdvancedMode: common.Bool, // #90
      BlackoutMode: common.UInt8, // #102
      DormancyEn: common.Bool, // #114
      ICN3100_T1L: common.UInt16, // #126
      ICN3100_T0L: common.UInt16, // #138
      ICN3100_T: common.UInt16,
    }),
  ],
  'ChipICN3100RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICN3100RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICN3100.decompiled.cs:47
 */
export const ChipICN3100RGBVExtendProperty = t.intersection(
  [
    ChipICN3100RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICN3100RGBVExtendProperty') }),
  ],
  'ChipICN3100RGBVExtendProperty'
);
export interface ChipICN3100RGBVExtendProperty
  extends t.TypeOf<typeof ChipICN3100RGBVExtendProperty> {}
