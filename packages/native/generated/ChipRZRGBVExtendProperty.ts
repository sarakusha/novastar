import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipRZRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IsOpenChannelCheck: common.Bool_false,
    }),
    t.partial({
      RedFirstReg1: common.UInt16, // #840
      GreenFirstReg1: common.UInt16, // #842
      BlueFirstReg1: common.UInt16, // #844
      VRedFirstReg1: common.UInt16, // #846
      RedFirstReg2: common.UInt16, // #848
      GreenFirstReg2: common.UInt16, // #850
      BlueFirstReg2: common.UInt16, // #852
      VRedFirstReg2: common.UInt16, // #854
      RedFirstReg3: common.UInt16, // #856
      GreenFirstReg3: common.UInt16, // #858
      BlueFirstReg3: common.UInt16, // #860
      VRedFirstReg3: common.UInt16, // #864
      IsUseNewModule: common.Bool, // #876
      FirstDataLen: common.Int32, // #878
      FirstStartIndex: common.Int32, // #880
      FirstRegisterAddr: common.Int32, // #882
      SecondDataLen: common.Int32, // #884
      SecondStartIndex: common.Int32, // #886
      SecondRegisterAddr: common.Int32, // #888
      ThirdDataLen: common.Int32, // #890
      ThirdDataStartIndex: common.Int32, // #892
      ThirdRegisterAddr: common.Int32, // #894
      IsAdvancedMode: common.Bool, // #896
      RedGian: common.UInt16, // #908
      GreenGian: common.UInt16, // #921
      BlueGian: common.UInt16, // #934
      BitLevel: common.UInt16, // #947
      OpenGain: common.Bool, // #960
      RZ_T1L: common.UInt16, // #972
      RZ_T0L: common.UInt16, // #984
      RZ_T: common.UInt16,
    }),
  ],
  'ChipRZRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipRZRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipRZ.decompiled.cs:831
 */
export const ChipRZRGBVExtendProperty = t.intersection(
  [
    ChipRZRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipRZRGBVExtendProperty') }),
  ],
  'ChipRZRGBVExtendProperty'
);
export interface ChipRZRGBVExtendProperty extends t.TypeOf<typeof ChipRZRGBVExtendProperty> {}
