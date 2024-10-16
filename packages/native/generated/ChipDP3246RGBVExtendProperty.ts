import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipDP3246ExtendProperty } from './ChipDP3246ExtendProperty';
 // import
export const ChipDP3246RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipDP3246ExtendProperty, // #4746
      GreenProperty: ChipDP3246ExtendProperty, // #4748
      BlueProperty: ChipDP3246ExtendProperty, // #4750
      VRedProperty: ChipDP3246ExtendProperty, // #4752
      ClkDataTransMode: common.UInt8, // #4756
      BlackScreenEnergySaving: common.Bool, // #4770
      EnableToRemoveBadPoints: common.Bool, // #4784
      IsAdvancedMode: common.Bool, // #4798
      IsUseNewModule: common.Bool, // #4810
      ChipLibVersion: common.UInt8, // #4812
      FirstDataLen: common.Int32, // #4814
      FirstStartIndex: common.Int32, // #4816
      FirstRegisterAddr: common.Int32, // #4818
      SecondDataLen: common.Int32, // #4820
      SecondStartIndex: common.Int32, // #4822
      SecondRegisterAddr: common.Int32, // #4824
      ThirdDataLen: common.Int32, // #4826
      ThirdDataStartIndex: common.Int32, // #4828
      ThirdRegisterAddr: common.Int32, // #4830
      FourthDataLen: common.Int32, // #4832
      FourthStartIndex: common.Int32, // #4834
      FourthRegisterAddr: common.Int32, // #4836
      ErrRedGain: common.Int32, // #4910
      ErrGreenGain: common.Int32, // #4922
      ErrBlueGain: common.Int32, // #4934
      ErrVRedGain: common.Int32, // #4946
    }),
  ],
  'ChipDP3246RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3246RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3246.decompiled.cs:4741
 */
export const ChipDP3246RGBVExtendProperty = t.intersection(
  [
    ChipDP3246RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3246RGBVExtendProperty') }),
  ],
  'ChipDP3246RGBVExtendProperty'
);
export interface ChipDP3246RGBVExtendProperty
  extends t.TypeOf<typeof ChipDP3246RGBVExtendProperty> {
  RedProperty?: ChipDP3246ExtendProperty;
  GreenProperty?: ChipDP3246ExtendProperty;
  BlueProperty?: ChipDP3246ExtendProperty;
  VRedProperty?: ChipDP3246ExtendProperty;
}
