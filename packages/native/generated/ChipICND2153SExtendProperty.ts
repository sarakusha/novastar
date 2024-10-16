import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND2153SExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      ShadowEliminationLevel: common.UInt8, // #458
      ShadowEliminationTime: common.UInt8, // #470
      LowAshUniformity: common.UInt8, // #482
      TheFirstSweepDarkCompensation: common.UInt8, // #494
      TheFirstLineSlantsDarkCompensationTime: common.UInt8, // #508
      LowAshColorCompensation: common.UInt8, // #520
      CrossCouplingToAdjust: common.UInt8, // #534
      CouplingToAdjust: common.UInt8, // #546
      CouplingOptimizationSecondEnhance: common.Bool, // #558
      SlowlyOpening: common.UInt8, // #570
      SlowlyOpeningEnhance: common.Bool, // #582
      KneeVoltage: common.UInt8, // #594
      Gain: common.UInt16, // #606
      PicHorOptimization: common.Bool, // #618
      Current: common.Bool, // #630
      EnableToRemoveBadPoints: common.Bool, // #659
      EnableCouplingToAdjust: common.Bool, // #671
      BeginTime: common.UInt8, // #683
      ScanType, // #695
      RefreshTheNumberOfClusters: common.UInt16, // #719
      InsertFrameMode: common.Bool, // #731
      GclkNum: common.UInt16, // #743
      EnergySavingMode: common.UInt8, // #755
      GclkFreqP: common.UInt8, // #781
      GclkFreqM: common.UInt8, // #798
      GclkFreqN: common.UInt8,
    }),
  ],
  'ChipICND2153SExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2153SExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2153S.decompiled.cs:451
 */
export const ChipICND2153SExtendProperty = t.intersection(
  [
    ChipICND2153SExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2153SExtendProperty') }),
  ],
  'ChipICND2153SExtendProperty'
);
export interface ChipICND2153SExtendProperty extends t.TypeOf<typeof ChipICND2153SExtendProperty> {
  ScanType?: ScanTypeEnum;
}
