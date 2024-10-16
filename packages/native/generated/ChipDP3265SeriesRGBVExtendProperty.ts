import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipDP3265SeriesExtendProperty } from './ChipDP3265SeriesExtendProperty';
 // import
export const ChipDP3265SeriesRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      AsynchronousRefresh: common.Int32_64, // #5366
      AsynchronousMaxRefresh: common.Int32_256, // #5369
      LowGrayHighRefresh: common.Int32_64, // #5437
      GammaStepSize: common.UInt8_1, // #5449
      GammaMaxRatio: common.Numeric_1,
    }),
    t.partial({
      RedProperty: ChipDP3265SeriesExtendProperty, // #5323
      GreenProperty: ChipDP3265SeriesExtendProperty, // #5325
      BlueProperty: ChipDP3265SeriesExtendProperty, // #5327
      VRedProperty: ChipDP3265SeriesExtendProperty, // #5329
      SpecialRegisterAddr: common.UInt32, // #5335
      IsUseNewModule: common.Bool, // #5337
      ChipLibVersion: common.UInt8, // #5339
      ScanType: common.UInt8, // #5341
      DisplayRefreshRate: common.UInt16, // #5372
      LowGrayHighRefreshMax: common.Int32, // #5375
      LineGraydepth: common.UInt16, // #5377
      GclkFrequencyCoefficient: common.UInt8, // #5389
      HighGrayIndependentRefresh: common.UInt8, // #5401
      BlackScreenDynamicConserveEnergy: common.UInt8, // #5413
      RemoveBadPoints: common.Bool, // #5425
      IsGammaDllMode: common.Bool, // #5452
      IsAdvancedMode: common.Bool, // #5455
      FourthDataLen: common.Int32, // #5467
      FourthStartIndex: common.Int32, // #5469
      FourthRegisterAddr: common.Int32, // #5471
      SpecialDataLen: common.Int32, // #5473
      SepcialRegisterAddr: common.UInt32, // #5475
      RomoveBadPointsRedGain: common.Int32, // #5529
      RomoveBadPointsGreenGain: common.Int32, // #5531
      RomoveBadPointsBlueGain: common.Int32, // #5533
      RomoveBadPointsVRedGain: common.Int32,
    }),
  ],
  'ChipDP3265SeriesRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3265SeriesRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3265Series.decompiled.cs:5320
 */
export const ChipDP3265SeriesRGBVExtendProperty = t.intersection(
  [
    ChipDP3265SeriesRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3265SeriesRGBVExtendProperty') }),
  ],
  'ChipDP3265SeriesRGBVExtendProperty'
);
export interface ChipDP3265SeriesRGBVExtendProperty
  extends t.TypeOf<typeof ChipDP3265SeriesRGBVExtendProperty> {
  RedProperty?: ChipDP3265SeriesExtendProperty;
  GreenProperty?: ChipDP3265SeriesExtendProperty;
  BlueProperty?: ChipDP3265SeriesExtendProperty;
  VRedProperty?: ChipDP3265SeriesExtendProperty;
}
