import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipDP3365SExtendProperty } from './ChipDP3365SExtendProperty';
 // import
export const ChipDP3365SRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegValue300: common.XMLArray(common.UInt16, 'ushort'), // #5215
      AsynchronousRefresh: common.Int32_64, // #5227
      AsynchronousMaxRefresh: common.Int32_128, // #5306
      GammaStepSize: common.UInt8_1, // #5318
      GammaMaxRatio: common.Numeric_1,
    }),
    t.partial({
      RedProperty: ChipDP3365SExtendProperty, // #5170
      GreenProperty: ChipDP3365SExtendProperty, // #5172
      BlueProperty: ChipDP3365SExtendProperty, // #5174
      VRedProperty: ChipDP3365SExtendProperty, // #5178
      SpecialRegisterAddr: common.UInt32, // #5184
      IsUseNewModule: common.Bool, // #5186
      ChipLibVersion: common.UInt8, // #5188
      ScanType: common.UInt8, // #5190
      DisplayRefreshRate: common.UInt16, // #5202
      RefunmperEn: common.UInt16, // #5230
      LineGraydepth: common.UInt16, // #5233
      GclkFrequencyCoefficient: common.UInt8, // #5246
      HighGrayIndependentRefresh: common.UInt8, // #5258
      BlackScreenDynamicConserveEnergy: common.UInt8, // #5270
      IsExternalResistor: common.UInt8, // #5282
      RemoveBadPoints: common.Bool, // #5294
      IsGammaDllMode: common.Bool, // #5321
      IsAdvancedMode: common.Bool, // #5324
      IsOpenNoRes: common.Bool, // #5336
      WithourResistantRedGainOne: common.UInt8, // #5348
      WithourResistantGreenGainOne: common.UInt8, // #5360
      WithourResistantBlueGainOne: common.UInt8, // #5372
      FourthDataLen: common.Int32, // #5384
      FourthStartIndex: common.Int32, // #5386
      FourthRegisterAddr: common.Int32, // #5388
      SpecialDataLen: common.Int32, // #5390
      SepcialRegisterAddr: common.UInt32, // #5392
      RomoveBadPointsRedGain: common.UInt8, // #5498
      RomoveBadPointsGreenGain: common.UInt8, // #5510
      RomoveBadPointsBlueGain: common.UInt8, // #5522
      ChipMemberIndex: common.Int32,
    }),
  ],
  'ChipDP3365SRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3365SRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3365S.decompiled.cs:5167
 */
export const ChipDP3365SRGBVExtendProperty = t.intersection(
  [
    ChipDP3365SRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3365SRGBVExtendProperty') }),
  ],
  'ChipDP3365SRGBVExtendProperty'
);
export interface ChipDP3365SRGBVExtendProperty
  extends t.TypeOf<typeof ChipDP3365SRGBVExtendProperty> {
  RedProperty?: ChipDP3365SExtendProperty;
  GreenProperty?: ChipDP3365SExtendProperty;
  BlueProperty?: ChipDP3365SExtendProperty;
  VRedProperty?: ChipDP3365SExtendProperty;
}
