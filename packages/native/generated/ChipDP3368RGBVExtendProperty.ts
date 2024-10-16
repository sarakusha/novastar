import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipDP3368ExtendProperty } from './ChipDP3368ExtendProperty';
 // import
export const ChipDP3368RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      AsynchronousRefresh: common.Int32_32, // #4380
      AsynchronousMaxRefresh: common.Int32_64, // #4446
      GammaStepSize: common.UInt8_1, // #4459
      GammaMaxRatio: common.Numeric_1, // #4485
      RemoveBadPointsRedGain: common.Int32_191, // #4539
      RemoveBadPointsGreenGain: common.Int32_191, // #4542
      RemoveBadPointsBlueGain: common.Int32_191,
    }),
    t.partial({
      RedProperty: ChipDP3368ExtendProperty, // #4338
      GreenProperty: ChipDP3368ExtendProperty, // #4340
      BlueProperty: ChipDP3368ExtendProperty, // #4342
      VRedProperty: ChipDP3368ExtendProperty, // #4344
      SpecialRegisterAddr: common.UInt32, // #4350
      IsUseNewModule: common.Bool, // #4352
      ChipLibVersion: common.UInt8, // #4354
      ScanType: common.UInt8, // #4356
      DisplayRefreshRate: common.UInt8, // #4383
      LineGraydepth: common.UInt16, // #4386
      GclkFrequencyCoefficient: common.UInt8, // #4398
      HighGrayIndependentRefresh: common.UInt8, // #4410
      BlackScreenDynamicConserveEnergy: common.UInt8, // #4422
      RemoveBadPoints: common.Bool, // #4434
      IsGammaDllMode: common.Bool, // #4462
      IsAdvancedMode: common.Bool, // #4465
      FourthDataLen: common.Int32, // #4477
      FourthStartIndex: common.Int32, // #4479
      FourthRegisterAddr: common.Int32, // #4481
      SpecialDataLen: common.Int32, // #4483
      SepcialRegisterAddr: common.UInt32, // #4545
      RomoveBadPointsVRedGain: common.Int32,
    }),
  ],
  'ChipDP3368RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3368RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3368.decompiled.cs:4335
 */
export const ChipDP3368RGBVExtendProperty = t.intersection(
  [
    ChipDP3368RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3368RGBVExtendProperty') }),
  ],
  'ChipDP3368RGBVExtendProperty'
);
export interface ChipDP3368RGBVExtendProperty
  extends t.TypeOf<typeof ChipDP3368RGBVExtendProperty> {
  RedProperty?: ChipDP3368ExtendProperty;
  GreenProperty?: ChipDP3368ExtendProperty;
  BlueProperty?: ChipDP3368ExtendProperty;
  VRedProperty?: ChipDP3368ExtendProperty;
}
