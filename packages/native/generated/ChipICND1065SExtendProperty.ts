import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND1065SExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      ShadowEliminationLevel: common.UInt8, // #462
      ShadowEliminationTime: common.UInt8, // #474
      LowAshUniformity: common.UInt8, // #486
      TheFirstSweepDarkCompensation: common.UInt8, // #498
      TheFirstLineSlantsDarkCompensationTime: common.UInt8, // #512
      LowAshColorCompensation: common.UInt8, // #524
      CrossCouplingToAdjust: common.UInt8, // #538
      CouplingToAdjust: common.UInt8, // #550
      CouplingOptimizationSecondEnhance: common.Bool, // #562
      SlowlyOpening: common.UInt8, // #574
      SlowlyOpeningEnhance: common.Bool, // #586
      KneeVoltage: common.UInt8, // #598
      Gain: common.UInt16, // #610
      Current: common.Bool, // #622
      EnableToRemoveBadPoints: common.Bool, // #651
      ShadowBeginEliminationTime: common.UInt8, // #663
      LowGary: common.UInt8, // #675
      EnableCouplingToAdjust: common.Bool, // #698
      BeginTime: common.UInt8, // #710
      ScanType, // #722
      ChangeVer: common.UInt8, // #746
      RefreshTheNumberOfClusters: common.UInt16, // #758
      GclkNum: common.UInt16, // #770
      EnergySavingMode: common.UInt8, // #782
      GclkFreqP: common.UInt8, // #811
      GclkFreqM: common.UInt8, // #828
      GclkFreqN: common.UInt8,
    }),
  ],
  'ChipICND1065SExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND1065SExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND1065S.decompiled.cs:453
 */
export const ChipICND1065SExtendProperty = t.intersection(
  [
    ChipICND1065SExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND1065SExtendProperty') }),
  ],
  'ChipICND1065SExtendProperty'
);
export interface ChipICND1065SExtendProperty extends t.TypeOf<typeof ChipICND1065SExtendProperty> {
  ScanType?: ScanTypeEnum;
}
