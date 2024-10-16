import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipHB200BRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedFirstReg1: common.UInt16, // #820
      GreenFirstReg1: common.UInt16, // #822
      BlueFirstReg1: common.UInt16, // #824
      VRedFirstReg1: common.UInt16, // #826
      RedFirstReg2: common.UInt16, // #828
      GreenFirstReg2: common.UInt16, // #830
      BlueFirstReg2: common.UInt16, // #832
      VRedFirstReg2: common.UInt16, // #834
      RedFirstReg3: common.UInt16, // #836
      GreenFirstReg3: common.UInt16, // #838
      BlueFirstReg3: common.UInt16, // #840
      VRedFirstReg3: common.UInt16, // #842
      RedFirstReg4: common.UInt16, // #844
      GreenFirstReg4: common.UInt16, // #846
      BlueFirstReg4: common.UInt16, // #848
      VRedFirstReg4: common.UInt16, // #850
      IsUseNewModule: common.Bool, // #852
      ChipLibVersion: common.UInt8, // #854
      FirstDataLen: common.Int32, // #856
      FirstStartIndex: common.Int32, // #858
      FirstRegisterAddr: common.Int32, // #860
      SecondDataLen: common.Int32, // #862
      SecondStartIndex: common.Int32, // #864
      SecondRegisterAddr: common.Int32, // #866
      ThirdDataLen: common.Int32, // #868
      ThirdDataStartIndex: common.Int32, // #870
      ThirdRegisterAddr: common.Int32, // #872
      FourthDataLen: common.Int32, // #874
      FourthStartIndex: common.Int32, // #876
      FourthRegisterAddr: common.Int32, // #878
      RedGian: common.UInt16, // #880
      GreenGian: common.UInt16, // #893
      BlueGian: common.UInt16, // #906
      HB200B_T1H: common.UInt16, // #919
      HB200B_T0H: common.UInt16, // #931
      HB200B_T: common.UInt16, // #943
      ChannelOpenDetectionEn: common.Bool, // #955
      ChannelOpenDetection: common.UInt8, // #979
      WorkingMode: common.UInt8, // #991
      AntiInterferenceEn: common.Bool, // #1003
    }),
  ],
  'ChipHB200BRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipHB200BRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHB200B.decompiled.cs:813
 */
export const ChipHB200BRGBVExtendProperty = t.intersection(
  [
    ChipHB200BRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHB200BRGBVExtendProperty') }),
  ],
  'ChipHB200BRGBVExtendProperty'
);
export interface ChipHB200BRGBVExtendProperty
  extends t.TypeOf<typeof ChipHB200BRGBVExtendProperty> {}
