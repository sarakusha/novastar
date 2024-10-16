import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCFD465AExtendProperty } from './ChipCFD465AExtendProperty';
 // import
export const ChipCFD465ARGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipCFD465AExtendProperty, // #680
      GreenProperty: ChipCFD465AExtendProperty, // #682
      BlueProperty: ChipCFD465AExtendProperty, // #684
      VRedProperty: ChipCFD465AExtendProperty, // #686
      LineBlankingBeginTime: common.UInt8, // #694
      SoftReset: common.Bool, // #706
      IsAdvancedMode: common.Bool, // #725
      SubField: common.UInt8, // #737
      GrayDepth: common.UInt8, // #758
      EnGCLKMutiRate: common.Bool, // #772
      GclkDoubleLine: common.Bool, // #786
      SRAMSetting: common.UInt8, // #804
      LowAshPaySetting: common.UInt8, // #818
      IsUseNewModule: common.Bool, // #832
      LowAshImport: common.UInt8, // #834
      FirstDataLen: common.Int32, // #919
      FirstStartIndex: common.Int32, // #921
      FirstRegisterAddr: common.Int32, // #923
      SecondDataLen: common.Int32, // #925
      SecondStartIndex: common.Int32, // #927
      SecondRegisterAddr: common.Int32, // #929
      ThirdDataLen: common.Int32, // #931
      ThirdDataStartIndex: common.Int32, // #933
      ThirdRegisterAddr: common.Int32, // #935
      FourthDataLen: common.Int32, // #937
      FourthStartIndex: common.Int32, // #939
      FourthRegisterAddr: common.Int32, // #941
      FifthDataLen: common.Int32, // #943
      FifthStartIndex: common.Int32, // #945
      FifthRegisterAddr: common.Int32, // #947
    }),
  ],
  'ChipCFD465ARGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD465ARGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD456A.decompiled.cs:673
 */
export const ChipCFD465ARGBVExtendProperty = t.intersection(
  [
    ChipCFD465ARGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD465ARGBVExtendProperty') }),
  ],
  'ChipCFD465ARGBVExtendProperty'
);
export interface ChipCFD465ARGBVExtendProperty
  extends t.TypeOf<typeof ChipCFD465ARGBVExtendProperty> {
  RedProperty?: ChipCFD465AExtendProperty;
  GreenProperty?: ChipCFD465AExtendProperty;
  BlueProperty?: ChipCFD465AExtendProperty;
  VRedProperty?: ChipCFD465AExtendProperty;
}
