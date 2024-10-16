import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND1068ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegLength: common.Int32_48, // #122
      RegBadPointLength: common.Int32_12, // #124
      RegValue: common.XMLArray(common.UInt16, 'ushort'), // #126
      RegBadPoint: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      BlankingGrade: common.UInt8, // #142
      BlankingTime: common.UInt8, // #154
      TheFirstDarkCompensation: common.UInt8, // #166
      TheFirstLineDarkCompensationTime: common.UInt8, // #179
      LowGrayColorCompensation: common.UInt8, // #191
      CouplingOptimizationMode: common.UInt8, // #204
      CouplingOptimizationOne: common.UInt8, // #217
      CouplingOptimizationTwoEnabled: common.Bool, // #229
      CouplingOptimization2_1: common.UInt8, // #241
      CouplingOptimization2_2: common.UInt8, // #253
      SlowSpeedOpen: common.UInt8, // #265
      InflectionPointVoltage: common.UInt8, // #277
      Gain: common.UInt16, // #289
      CurrentVerifiCationMode: common.Bool, // #301
      BlackScreenEnergyConservation: common.UInt8, // #316
      ScanType, // #342
      RefreshTheNumberOfClusters: common.UInt16, // #366
      GclkNumber: common.Int32, // #378
      GclkFreqP: common.UInt8, // #390
      GclkFreqM: common.UInt8, // #402
      GclkFreqN: common.UInt8, // #414
      LowGrayRefHighModeEn: common.UInt8,
    }),
  ],
  'ChipICND1068ExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND1068ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND1068.decompiled.cs:119
 */
export const ChipICND1068ExtendProperty = t.intersection(
  [
    ChipICND1068ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND1068ExtendProperty') }),
  ],
  'ChipICND1068ExtendProperty'
);
export interface ChipICND1068ExtendProperty extends t.TypeOf<typeof ChipICND1068ExtendProperty> {
  ScanType?: ScanTypeEnum;
}
