import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipDP3369SExtendProperty } from './ChipDP3369SExtendProperty';
 // import
export const ChipDP3369SRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      AsynchronousRefresh: common.Int32_64, // #4734
      AsynchronousMaxRefresh: common.Int32_128, // #4813
      GammaStepSize: common.UInt8_1, // #4825
      GammaMaxRatio: common.Numeric_1,
    }),
    t.partial({
      RedProperty: ChipDP3369SExtendProperty, // #4679
      GreenProperty: ChipDP3369SExtendProperty, // #4682
      BlueProperty: ChipDP3369SExtendProperty, // #4685
      VRedProperty: ChipDP3369SExtendProperty, // #4688
      SpecialRegisterAddr: common.UInt32, // #4691
      IsUseNewModule: common.Bool, // #4693
      ChipLibVersion: common.UInt8, // #4695
      ScanType: common.UInt8, // #4697
      DisplayRefreshRate: common.UInt16, // #4709
      RefunmperEn: common.UInt16, // #4737
      LineGraydepth: common.UInt16, // #4740
      GclkFrequencyCoefficient: common.UInt8, // #4752
      HighGrayIndependentRefresh: common.UInt8, // #4765
      BlackScreenDynamicConserveEnergy: common.UInt8, // #4777
      IsExternalResistor: common.UInt8, // #4789
      RemoveBadPoints: common.Bool, // #4801
      IsGammaDllMode: common.Bool, // #4828
      IsAdvancedMode: common.Bool, // #4831
      IsOpenNoRes: common.Bool, // #4843
      WithourResistantRedGainOne: common.UInt8, // #4855
      WithourResistantGreenGainOne: common.UInt8, // #4867
      WithourResistantBlueGainOne: common.UInt8, // #4879
      FourthDataLen: common.Int32, // #4891
      FourthStartIndex: common.Int32, // #4893
      FourthRegisterAddr: common.Int32, // #4895
      SpecialDataLen: common.Int32, // #4897
      RomoveBadPointsRedGain: common.UInt8, // #5003
      RomoveBadPointsGreenGain: common.UInt8, // #5015
      RomoveBadPointsBlueGain: common.UInt8,
    }),
  ],
  'ChipDP3369SRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3369SRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3369S.decompiled.cs:4674
 */
export const ChipDP3369SRGBVExtendProperty = t.intersection(
  [
    ChipDP3369SRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3369SRGBVExtendProperty') }),
  ],
  'ChipDP3369SRGBVExtendProperty'
);
export interface ChipDP3369SRGBVExtendProperty
  extends t.TypeOf<typeof ChipDP3369SRGBVExtendProperty> {
  RedProperty?: ChipDP3369SExtendProperty;
  GreenProperty?: ChipDP3369SExtendProperty;
  BlueProperty?: ChipDP3369SExtendProperty;
  VRedProperty?: ChipDP3369SExtendProperty;
}
