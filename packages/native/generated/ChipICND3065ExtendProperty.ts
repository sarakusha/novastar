import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND3065ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegLength: common.withDefault(common.Int32, 92), // #4154
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      ShadowEliminationLevel: common.UInt8, // #4158
      ShadowEliminationTime: common.UInt8, // #4170
      TheFirstSweepDarkCompensation: common.UInt8, // #4182
      TheFirstLine: common.UInt8, // #4194
      TheFirstLineSlantsDarkCompensationTuning1: common.UInt8, // #4206
      TheFirstLineSlantsDarkCompensationTuning1En: common.Bool, // #4218
      TheFirstLineSlantsDarkCompensationTime: common.UInt8, // #4230
      TheFirstLineSlantsDarkCompensationTuning2: common.UInt8, // #4242
      TheFirstLineSlantsDarkCompensationTuning2En: common.Bool, // #4254
      LowAshColorCompensation: common.UInt8, // #4266
      EnableCoupling: common.Bool, // #4279
      CouplingToAdjust2: common.UInt8, // #4291
      EnableCouplingToAdjust: common.Bool, // #4303
      VerticalImprove: common.UInt8, // #4315
      GradientoptimizationPro: common.Bool, // #4347
      KneeVoltage: common.UInt8, // #4359
      LowRefershMode: common.UInt8, // #4371
      SlowOpen: common.UInt8, // #4394
      CrossCouplingToAdjust: common.UInt8, // #4445
      LowAdujustEn: common.Bool, // #4457
      Q: common.UInt8, // #4473
      LowAdujust1: common.UInt8, // #4485
      LowAdujust2: common.UInt8, // #4497
      LowAdujust3: common.UInt8, // #4509
      LowAdujust4: common.UInt8, // #4521
      LowAdujust5: common.UInt8, // #4533
      EleAmend: common.UInt8, // #4545
      LowGray: common.UInt8, // #4557
      Gain: common.UInt16, // #4569
      ScanType, // #4581
      LowAshUniformity: common.UInt8, // #4595
      RefreshTheNumberOfClusters: common.UInt16, // #4619
      GclkNumber: common.Int32, // #4631
      DisplayMode: common.UInt8, // #4643
      EnergySavingMode: common.UInt8, // #4655
      EnableToRemoveBadPoints: common.Bool, // #4681
      GclkFreqP: common.UInt8, // #4697
      GclkFreqM: common.UInt8, // #4709
      GclkFreqN: common.UInt8, // #4722
      TestGainEn: common.Bool,
    }),
  ],
  'ChipICND3065ExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND3065ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND3065.decompiled.cs:4151
 */
export const ChipICND3065ExtendProperty = t.intersection(
  [
    ChipICND3065ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND3065ExtendProperty') }),
  ],
  'ChipICND3065ExtendProperty'
);
export interface ChipICND3065ExtendProperty extends t.TypeOf<typeof ChipICND3065ExtendProperty> {
  ScanType?: ScanTypeEnum;
}
