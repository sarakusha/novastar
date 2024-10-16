import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipHG2248RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_8, // #46
      RegistorDataLen: common.Int32_8, // #48
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      RedFirstReg1: common.UInt16, // #54
      GreenFirstReg1: common.UInt16, // #56
      BlueFirstReg1: common.UInt16, // #58
      VRedFirstReg1: common.UInt16, // #60
      RedFirstReg2: common.UInt16, // #62
      GreenFirstReg2: common.UInt16, // #64
      BlueFirstReg2: common.UInt16, // #66
      VRedFirstReg2: common.UInt16, // #68
      RedFirstReg3: common.UInt16, // #70
      GreenFirstReg3: common.UInt16, // #72
      BlueFirstReg3: common.UInt16, // #74
      VRedFirstReg3: common.UInt16, // #76
      IsUseNewModule: common.Bool, // #78
      FirstDataLen: common.Int32, // #80
      FirstStartIndex: common.Int32, // #82
      FirstRegisterAddr: common.Int32, // #84
      SecondDataLen: common.Int32, // #86
      SecondStartIndex: common.Int32, // #88
      SecondRegisterAddr: common.Int32, // #90
      ThirdDataLen: common.Int32, // #92
      ThirdDataStartIndex: common.Int32, // #94
      ThirdRegisterAddr: common.Int32, // #96
      GroupLength: common.UInt16, // #98
      Tall2: common.UInt16, // #110
      Tall1: common.UInt16, // #123
      One: common.UInt16, // #136
      Two: common.UInt16, // #149
      Three: common.UInt16, // #162
      Four: common.UInt16, // #175
      Five: common.UInt16, // #188
      Six: common.UInt16, // #201
      Seven: common.UInt16, // #214
      Eight: common.UInt16, // #227
      OpenGain: common.Bool, // #240
      RZ_T1L: common.UInt16, // #252
      RZ_T0L: common.UInt16, // #264
      RZ_T: common.UInt16, // #276
      Open_BTL: common.Bool, // #288
      SpecialDataLen: common.Int32, // #300
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipHG2248RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipHG2248RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHG2248.decompiled.cs:43
 */
export const ChipHG2248RGBVExtendProperty = t.intersection(
  [
    ChipHG2248RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHG2248RGBVExtendProperty') }),
  ],
  'ChipHG2248RGBVExtendProperty'
);
export interface ChipHG2248RGBVExtendProperty
  extends t.TypeOf<typeof ChipHG2248RGBVExtendProperty> {}
