import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipC8325ExtendProperty } from './ChipC8325ExtendProperty';
 // import
export const ChipC8325RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipC8325ExtendProperty, // #2665
      GreenProperty: ChipC8325ExtendProperty, // #2667
      BlueProperty: ChipC8325ExtendProperty, // #2669
      VRedProperty: ChipC8325ExtendProperty, // #2671
      SubField: common.UInt8, // #2694
      GrayDepth: common.UInt8, // #2712
      GclkSelection: common.UInt8, // #2734
      IsAdvancedMode: common.Bool, // #2746
      IsUseNewModule: common.Bool, // #2758
      SpecialDataLen: common.Int32, // #2831
      FirstDataLen: common.Int32, // #2833
      FirstStartIndex: common.Int32, // #2835
      FirstRegisterAddr: common.Int32, // #2837
      SecondDataLen: common.Int32, // #2839
      SecondStartIndex: common.Int32, // #2841
      SecondRegisterAddr: common.Int32, // #2843
      ThirdDataLen: common.Int32, // #2845
      ThirdDataStartIndex: common.Int32, // #2847
      ThirdRegisterAddr: common.Int32, // #2849
      FourthDataLen: common.Int32, // #2851
      FourthStartIndex: common.Int32, // #2853
      FourthRegisterAddr: common.Int32, // #2855
    }),
  ],
  'ChipC8325RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipC8325RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipC8325.decompiled.cs:2658
 */
export const ChipC8325RGBVExtendProperty = t.intersection(
  [
    ChipC8325RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipC8325RGBVExtendProperty') }),
  ],
  'ChipC8325RGBVExtendProperty'
);
export interface ChipC8325RGBVExtendProperty extends t.TypeOf<typeof ChipC8325RGBVExtendProperty> {
  RedProperty?: ChipC8325ExtendProperty;
  GreenProperty?: ChipC8325ExtendProperty;
  BlueProperty?: ChipC8325ExtendProperty;
  VRedProperty?: ChipC8325ExtendProperty;
}
