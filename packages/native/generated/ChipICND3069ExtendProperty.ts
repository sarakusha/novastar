import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND3069ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegLength: common.withDefault(common.Int32, 96), // #4291
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      ShadowEliminationLevel: common.UInt8, // #4296
      ShadowEliminationTime: common.UInt8, // #4308
      LowAshUniformity: common.UInt8, // #4320
      TheFirstSweepDarkCompensation: common.UInt8, // #4342
      TheFirstLineEn: common.Bool, // #4354
      TheFirstLineSlantsDarkCompensationTime: common.UInt8, // #4366
      TheFirstLineSlantsDarkCompensationTuning1: common.UInt8, // #4378
      TheFirstLineSlantsDarkCompensationTuning2: common.UInt8, // #4390
      EnableCoupling: common.Bool, // #4402
      CouplingToAdjustOne: common.UInt16, // #4414
      EnableCouplingToAdjustOne: common.Bool, // #4428
      EnableCouplingToAdjustOneTime: common.UInt16, // #4440
      CouplingToAdjustTwo: common.UInt16, // #4453
      EnableCouplingToAdjustTwo: common.Bool, // #4465
      EnableCouplingToAdjustTwoTime: common.UInt16, // #4477
      LowAshColorCastCompensation: common.UInt8, // #4490
      LowAshColorCastCompensationOne: common.UInt8, // #4505
      LowAshColorCastCompensationTwo: common.UInt8, // #4517
      LowAshLevelCompensationOne: common.UInt16, // #4529
      LowAshLevelCompensationTwo: common.UInt16, // #4542
      LowAshLevelCompensationThree: common.UInt16, // #4555
      LowAshLevelCompensationFour: common.UInt16, // #4568
      LowAshColorCastCompensationFive: common.UInt8, // #4581
      LowAshColorCastCompensationSix: common.UInt8, // #4593
      LowAshColorCastCompensationSeven: common.UInt8, // #4605
      LowAshColorCastCompensationEight: common.UInt8, // #4617
      LowAshColorCastCompensationNine: common.UInt8, // #4629
      LowAshColorCastCompensationTen: common.UInt8, // #4641
      LowAshTwoLevelCompensationOne: common.UInt16, // #4653
      LowAshTwoLevelCompensationTwo: common.UInt16, // #4666
      LowAshTwoLevelCompensationThree: common.UInt16, // #4679
      SlowlyOpen: common.UInt8, // #4692
      SlowlyOpenEnable: common.Bool, // #4704
      KneeVoltage: common.UInt8, // #4716
      TestGainEn: common.Bool, // #4728
      ElectricityAmend: common.UInt8, // #4743
      BlackEnergySaving: common.UInt8, // #4761
      HighRefreshMode: common.UInt8, // #4781
      Gain: common.UInt16, // #4809
      Iref: common.UInt16, // #4821
      EnableToRemoveBadPoints: common.Bool, // #4833
      Q: common.UInt8, // #4845
      ScanType, // #4864
      RefreshTheNumberOfClusters: common.UInt16, // #4878
      GclkNumber: common.UInt16, // #4890
      GclkFreqP: common.UInt8, // #4903
      GclkFreqM: common.UInt8, // #4915
      InterpolationFrameMode: common.Bool, // #4928
      KickoffTimeForShadowElimination: common.UInt8, // #4940
      WaitingTime: common.UInt8,
    }),
  ],
  'ChipICND3069ExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND3069ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND3069.decompiled.cs:4288
 */
export const ChipICND3069ExtendProperty = t.intersection(
  [
    ChipICND3069ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND3069ExtendProperty') }),
  ],
  'ChipICND3069ExtendProperty'
);
export interface ChipICND3069ExtendProperty extends t.TypeOf<typeof ChipICND3069ExtendProperty> {
  ScanType?: ScanTypeEnum;
}
