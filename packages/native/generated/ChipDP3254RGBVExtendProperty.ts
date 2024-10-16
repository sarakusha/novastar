import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipDP3254ExtendProperty } from './ChipDP3254ExtendProperty';
 // import
export const ChipDP3254RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegValue300: common.XMLArray(common.UInt16, 'ushort'), // #4367
      AsynchronousRefresh: common.Int32_64, // #4380
      AsynchronousMaxRefresh: common.Int32_128, // #4458
      GammaStepSize: common.UInt8_1, // #4470
      GammaMaxRatio: common.Numeric_1,
    }),
    t.partial({
      RedProperty: ChipDP3254ExtendProperty, // #4323
      GreenProperty: ChipDP3254ExtendProperty, // #4325
      BlueProperty: ChipDP3254ExtendProperty, // #4327
      VRedProperty: ChipDP3254ExtendProperty, // #4331
      SpecialRegisterAddr: common.UInt32, // #4349
      IsUseNewModule: common.Bool, // #4351
      ChipLibVersion: common.UInt8, // #4353
      ScanType: common.UInt8, // #4355
      DisplayRefreshRate: common.UInt16, // #4383
      LineGraydepth: common.UInt16, // #4386
      GclkFrequencyCoefficient: common.UInt8, // #4398
      HighGrayIndependentRefresh: common.UInt8, // #4410
      BlackScreenDynamicConserveEnergy: common.UInt8, // #4422
      IsExternalResistor: common.UInt8, // #4434
      RemoveBadPoints: common.Bool, // #4446
      IsGammaDllMode: common.Bool, // #4473
      IsAdvancedMode: common.Bool, // #4476
      IsOpenNoRes: common.Bool, // #4488
      WithourResistantRedGainOne: common.UInt8, // #4500
      WithourResistantGreenGainOne: common.UInt8, // #4512
      WithourResistantBlueGainOne: common.UInt8, // #4524
      FourthDataLen: common.Int32, // #4536
      FourthStartIndex: common.Int32, // #4538
      FourthRegisterAddr: common.Int32, // #4540
      SpecialDataLen: common.Int32, // #4542
      SepcialRegisterAddr: common.UInt32, // #4544
      RomoveBadPointsRedGain: common.Int32, // #4650
      RomoveBadPointsGreenGain: common.Int32, // #4652
      RomoveBadPointsBlueGain: common.Int32, // #4654
      RomoveBadPointsVRedGain: common.Int32,
    }),
  ],
  'ChipDP3254RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3254RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3254.decompiled.cs:4320
 */
export const ChipDP3254RGBVExtendProperty = t.intersection(
  [
    ChipDP3254RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3254RGBVExtendProperty') }),
  ],
  'ChipDP3254RGBVExtendProperty'
);
export interface ChipDP3254RGBVExtendProperty
  extends t.TypeOf<typeof ChipDP3254RGBVExtendProperty> {
  RedProperty?: ChipDP3254ExtendProperty;
  GreenProperty?: ChipDP3254ExtendProperty;
  BlueProperty?: ChipDP3254ExtendProperty;
  VRedProperty?: ChipDP3254ExtendProperty;
}
