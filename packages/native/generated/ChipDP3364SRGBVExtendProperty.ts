import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipDP3364SExtendProperty } from './ChipDP3364SExtendProperty';
 // import
export const ChipDP3364SRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      AsynchronousRefresh: common.Int32_64, // #4663
      AsynchronousMaxRefresh: common.Int32_128, // #4741
      GammaStepSize: common.UInt8_1, // #4753
      GammaMaxRatio: common.Numeric_1,
    }),
    t.partial({
      RedProperty: ChipDP3364SExtendProperty, // #4620
      GreenProperty: ChipDP3364SExtendProperty, // #4623
      BlueProperty: ChipDP3364SExtendProperty, // #4626
      VRedProperty: ChipDP3364SExtendProperty, // #4629
      SpecialRegisterAddr: common.UInt32, // #4632
      IsUseNewModule: common.Bool, // #4634
      ChipLibVersion: common.UInt8, // #4636
      ScanType: common.UInt8, // #4638
      DisplayRefreshRate: common.UInt16, // #4666
      LineGraydepth: common.UInt16, // #4669
      GclkFrequencyCoefficient: common.UInt8, // #4681
      HighGrayIndependentRefresh: common.UInt8, // #4693
      BlackScreenDynamicConserveEnergy: common.UInt8, // #4705
      IsExternalResistor: common.UInt8, // #4717
      RemoveBadPoints: common.Bool, // #4729
      IsGammaDllMode: common.Bool, // #4756
      IsAdvancedMode: common.Bool, // #4759
      IsOpenNoRes: common.Bool, // #4771
      WithourResistantRedGainOne: common.UInt8, // #4783
      WithourResistantGreenGainOne: common.UInt8, // #4795
      WithourResistantBlueGainOne: common.UInt8, // #4807
      FourthDataLen: common.Int32, // #4819
      FourthStartIndex: common.Int32, // #4821
      FourthRegisterAddr: common.Int32, // #4823
      SpecialDataLen: common.Int32, // #4825
      RomoveBadPointsRedGain: common.UInt8, // #4931
      RomoveBadPointsGreenGain: common.UInt8, // #4943
      RomoveBadPointsBlueGain: common.UInt8,
    }),
  ],
  'ChipDP3364SRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3364SRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3364S.decompiled.cs:4615
 */
export const ChipDP3364SRGBVExtendProperty = t.intersection(
  [
    ChipDP3364SRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3364SRGBVExtendProperty') }),
  ],
  'ChipDP3364SRGBVExtendProperty'
);
export interface ChipDP3364SRGBVExtendProperty
  extends t.TypeOf<typeof ChipDP3364SRGBVExtendProperty> {
  RedProperty?: ChipDP3364SExtendProperty;
  GreenProperty?: ChipDP3364SExtendProperty;
  BlueProperty?: ChipDP3364SExtendProperty;
  VRedProperty?: ChipDP3364SExtendProperty;
}
