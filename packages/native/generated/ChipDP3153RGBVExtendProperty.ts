import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipDP3153ExtendProperty } from './ChipDP3153ExtendProperty';
 // import
export const ChipDP3153RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      AsynchronousMaxRefresh: common.Int32_64, // #3868
      GammaStepSize: common.UInt8_1, // #3880
      GammaMaxRatio: common.Numeric_1,
    }),
    t.partial({
      RedProperty: ChipDP3153ExtendProperty, // #3750
      GreenProperty: ChipDP3153ExtendProperty, // #3752
      BlueProperty: ChipDP3153ExtendProperty, // #3754
      VRedProperty: ChipDP3153ExtendProperty, // #3756
      SpecialRegisterAddr: common.UInt32, // #3762
      IsUseNewModule: common.Bool, // #3764
      ChipLibVersion: common.UInt8, // #3766
      ScanType: common.UInt8, // #3768
      DisplayRefreshRate: common.UInt16, // #3793
      LineGraydepth: common.UInt16, // #3796
      GclkFrequencyCoefficient: common.UInt8, // #3808
      HighGrayIndependentRefresh: common.UInt8, // #3820
      BlackScreenDynamicConserveEnergy: common.UInt8, // #3832
      IsExternalResistor: common.UInt8, // #3844
      RemoveBadPoints: common.Bool, // #3856
      IsGammaDllMode: common.Bool, // #3883
      IsAdvancedMode: common.Bool, // #3886
      FourthDataLen: common.Int32, // #3898
      FourthStartIndex: common.Int32, // #3900
      FourthRegisterAddr: common.Int32, // #3902
      SpecialDataLen: common.Int32, // #3904
      SepcialRegisterAddr: common.UInt32, // #3906
      RomoveBadPointsRedGain: common.Int32, // #3960
      RomoveBadPointsGreenGain: common.Int32, // #3962
      RomoveBadPointsBlueGain: common.Int32, // #3964
      RomoveBadPointsVRedGain: common.Int32,
    }),
  ],
  'ChipDP3153RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3153RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3153.decompiled.cs:3747
 */
export const ChipDP3153RGBVExtendProperty = t.intersection(
  [
    ChipDP3153RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3153RGBVExtendProperty') }),
  ],
  'ChipDP3153RGBVExtendProperty'
);
export interface ChipDP3153RGBVExtendProperty
  extends t.TypeOf<typeof ChipDP3153RGBVExtendProperty> {
  RedProperty?: ChipDP3153ExtendProperty;
  GreenProperty?: ChipDP3153ExtendProperty;
  BlueProperty?: ChipDP3153ExtendProperty;
  VRedProperty?: ChipDP3153ExtendProperty;
}
