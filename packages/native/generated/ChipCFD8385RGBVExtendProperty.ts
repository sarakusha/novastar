import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCFD8385ExtendProperty } from './ChipCFD8385ExtendProperty';
 // import
export const ChipCFD8385RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipCFD8385ExtendProperty, // #3586
      GreenProperty: ChipCFD8385ExtendProperty, // #3588
      BlueProperty: ChipCFD8385ExtendProperty, // #3590
      VRedProperty: ChipCFD8385ExtendProperty, // #3592
      GclkToDclkNum: common.UInt8, // #3604
      IsOverflowValue: common.Bool, // #3616
      SubField: common.UInt8, // #3648
      GrayDepth: common.UInt8, // #3669
      IsAdvancedMode: common.Bool, // #3683
      DataBit: common.UInt8, // #3695
      TrueGrayDepth: common.UInt8, // #3707
      CFDSpecialShift: common.UInt8, // #3719
      IsUseNewModule: common.Bool, // #3731
      PLLFreqDivision: common.UInt8, // #3733
      PLLFreqDoubling: common.UInt8, // #3747
      GrayClkSelect: common.UInt8, // #3761
      DataByteSys: common.UInt8, // #3775
      FirstDataLen: common.Int32, // #3860
      FirstStartIndex: common.Int32, // #3862
      FirstRegisterAddr: common.Int32, // #3864
      SecondDataLen: common.Int32, // #3866
      SecondStartIndex: common.Int32, // #3868
      SecondRegisterAddr: common.Int32, // #3870
      ThirdDataLen: common.Int32, // #3872
      ThirdDataStartIndex: common.Int32, // #3874
      ThirdRegisterAddr: common.Int32, // #3876
      FourthDataLen: common.Int32, // #3878
      FourthStartIndex: common.Int32, // #3880
      FourthRegisterAddr: common.Int32, // #3882
      FifthDataLen: common.Int32, // #3884
      FifthStartIndex: common.Int32, // #3886
      FifthRegisterAddr: common.Int32, // #3888
      SixthDataLen: common.Int32, // #3890
      SixthStartIndex: common.Int32, // #3892
      SixthRegisterAddr: common.Int32, // #3894
      SpecialDataLen: common.Int32, // #3896
      SpecialRegisterAddr: common.UInt32, // #3898
    }),
  ],
  'ChipCFD8385RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD8385RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD8385.decompiled.cs:3581
 */
export const ChipCFD8385RGBVExtendProperty = t.intersection(
  [
    ChipCFD8385RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD8385RGBVExtendProperty') }),
  ],
  'ChipCFD8385RGBVExtendProperty'
);
export interface ChipCFD8385RGBVExtendProperty
  extends t.TypeOf<typeof ChipCFD8385RGBVExtendProperty> {
  RedProperty?: ChipCFD8385ExtendProperty;
  GreenProperty?: ChipCFD8385ExtendProperty;
  BlueProperty?: ChipCFD8385ExtendProperty;
  VRedProperty?: ChipCFD8385ExtendProperty;
}
