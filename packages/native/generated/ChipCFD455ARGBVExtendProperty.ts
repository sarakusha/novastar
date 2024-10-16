import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCFD455AExtendProperty } from './ChipCFD455AExtendProperty';
 // import
export const ChipCFD455ARGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipCFD455AExtendProperty, // #3539
      GreenProperty: ChipCFD455AExtendProperty, // #3541
      BlueProperty: ChipCFD455AExtendProperty, // #3543
      VRedProperty: ChipCFD455AExtendProperty, // #3545
      EnGCLKMutiRate: common.Bool, // #3570
      GclkDoubleLine: common.Bool, // #3584
      SubField: common.UInt8, // #3598
      GrayDepth: common.UInt8, // #3619
      IsAdvancedMode: common.Bool, // #3643
      IsUseNewModule: common.Bool, // #3655
      FirstDataLen: common.Int32, // #3657
      FirstStartIndex: common.Int32, // #3659
      FirstRegisterAddr: common.Int32, // #3661
      SecondDataLen: common.Int32, // #3663
      SecondStartIndex: common.Int32, // #3665
      SecondRegisterAddr: common.Int32, // #3667
      ThirdDataLen: common.Int32, // #3669
      ThirdDataStartIndex: common.Int32, // #3671
      ThirdRegisterAddr: common.Int32, // #3673
      FourthDataLen: common.Int32, // #3675
      FourthStartIndex: common.Int32, // #3677
      FourthRegisterAddr: common.Int32, // #3679
    }),
  ],
  'ChipCFD455ARGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD455ARGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD455A.decompiled.cs:3532
 */
export const ChipCFD455ARGBVExtendProperty = t.intersection(
  [
    ChipCFD455ARGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD455ARGBVExtendProperty') }),
  ],
  'ChipCFD455ARGBVExtendProperty'
);
export interface ChipCFD455ARGBVExtendProperty
  extends t.TypeOf<typeof ChipCFD455ARGBVExtendProperty> {
  RedProperty?: ChipCFD455AExtendProperty;
  GreenProperty?: ChipCFD455AExtendProperty;
  BlueProperty?: ChipCFD455AExtendProperty;
  VRedProperty?: ChipCFD455AExtendProperty;
}
