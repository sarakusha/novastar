import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipDP3264ExtendProperty } from './ChipDP3264ExtendProperty';
 // import
export const ChipDP3264RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_13, // #3596
      RefreshNum: common.Int32_32, // #3610
      MaxRefreshNum: common.Int32_64, // #3729
      GammaStepSize: common.UInt8_1, // #3731
      GammaMaxRatio: common.Numeric_1,
    }),
    t.partial({
      RedProperty: ChipDP3264ExtendProperty, // #3568
      GreenProperty: ChipDP3264ExtendProperty, // #3571
      BlueProperty: ChipDP3264ExtendProperty, // #3574
      VRedProperty: ChipDP3264ExtendProperty, // #3577
      RefreshNumPerVs: common.UInt8, // #3613
      LineGclkNum: common.UInt8, // #3616
      R: common.UInt8, // #3630
      LowGrayDisplayEnhance: common.Bool, // #3644
      BlackScreenDynamicEnergySaving: common.UInt8, // #3658
      HighGrayDataIndependentRefresh: common.UInt8, // #3672
      EnableToRemoveBadPoints: common.Bool, // #3686
      IsAdvancedMode: common.Bool, // #3700
      IsGammaDllMode: common.Bool, // #3712
      IsUseNewModule: common.Bool, // #3725
      SpecialDataLen: common.Int32, // #3727
      SpecialRegisterAddr: common.UInt32, // #3746
      FourthDataLen: common.Int32, // #3761
      FourthStartIndex: common.Int32, // #3763
      FourthRegisterAddr: common.Int32, // #3765
      ErrRedGain: common.Int32, // #3839
      ErrGreenGain: common.Int32, // #3841
      ErrBlueGain: common.Int32, // #3843
      ErrVRedGain: common.Int32,
    }),
  ],
  'ChipDP3264RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3264RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3264.decompiled.cs:3561
 */
export const ChipDP3264RGBVExtendProperty = t.intersection(
  [
    ChipDP3264RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3264RGBVExtendProperty') }),
  ],
  'ChipDP3264RGBVExtendProperty'
);
export interface ChipDP3264RGBVExtendProperty
  extends t.TypeOf<typeof ChipDP3264RGBVExtendProperty> {
  RedProperty?: ChipDP3264ExtendProperty;
  GreenProperty?: ChipDP3264ExtendProperty;
  BlueProperty?: ChipDP3264ExtendProperty;
  VRedProperty?: ChipDP3264ExtendProperty;
}
