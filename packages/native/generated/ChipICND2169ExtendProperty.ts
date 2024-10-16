import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND2169ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegLength: common.Int32_48, // #5013
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #5017
      ShadowEliminationLevel: common.UInt8, // #5019
      ShadowEliminationTime: common.UInt8, // #5031
      TheFirstSweepDarkCompensation: common.UInt8, // #5043
      TheFirstLine: common.Bool, // #5056
      TheFirstLineSlantsDarkCompensationTuning: common.UInt8, // #5068
      TheFirstLineSlantsDarkCompensationTime: common.UInt8, // #5080
      LowAshColorCompensation: common.UInt8, // #5092
      CouplingToAdjust: common.UInt8, // #5105
      EnableCouplingToAdjust: common.Bool, // #5117
      EnableCoupling: common.Bool, // #5129
      Gradientoptimization: common.Bool, // #5141
      CouplingEnhancedMode: common.Bool, // #5153
      CouplingEnhanced: common.Bool, // #5165
      SlowOpen: common.UInt8, // #5177
      CrossCouplingToAdjust: common.UInt8, // #5192
      KneeVoltage: common.UInt8, // #5204
      Gain: common.UInt16, // #5216
      ScanType, // #5228
      LowAshUniformity: common.UInt8, // #5254
      RefreshTheNumberOfClusters: common.UInt16, // #5278
      SubFields: common.UInt8, // #5290
      GclkNumber: common.Int32, // #5302
      DisplayMode: common.UInt8, // #5314
      Lasbsabled: common.Bool, // #5326
      LasbsableEn: common.Bool, // #5338
      LevelOne: common.UInt8, // #5350
      LevelTwo: common.UInt8, // #5362
      LevelThree: common.UInt8, // #5374
      EnergySavingMode: common.UInt8, // #5386
      EnableToRemoveBadPoints: common.Bool, // #5412
      GclkFreqP: common.UInt8, // #5424
      GclkFreqM: common.UInt8, // #5436
      GclkFreqN: common.UInt8, // #5449
      TestGainEn: common.Bool, // #5461
      RInterMode: common.Bool, // #5476
      InterMode: common.UInt8,
    }),
  ],
  'ChipICND2169ExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2169ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2169.decompiled.cs:5010
 */
export const ChipICND2169ExtendProperty = t.intersection(
  [
    ChipICND2169ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2169ExtendProperty') }),
  ],
  'ChipICND2169ExtendProperty'
);
export interface ChipICND2169ExtendProperty extends t.TypeOf<typeof ChipICND2169ExtendProperty> {
  ScanType?: ScanTypeEnum;
}
