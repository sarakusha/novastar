import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND1065LExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegLength: common.Int32_48, // #170
      BadPointRegLength: common.Int32_8, // #172
      RegValue: common.XMLArray(common.UInt16, 'ushort'), // #174
      BadPointRegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      ShadowEliminationLevel: common.UInt8, // #180
      ShadowEliminationTime: common.UInt8, // #192
      LowAshUniformity: common.Bool, // #204
      TheFirstSweepDarkCompensationEn: common.Bool, // #216
      TheFirstSweepDarkCompensation: common.UInt8, // #228
      TheFirstLineSlantsDarkCompensationTime: common.UInt8, // #240
      LowAshColorCompensation: common.UInt8, // #252
      CouplingOptimization: common.Bool, // #266
      CouplingOptimizationFirst: common.UInt8, // #278
      EnableCouplingToAdjust: common.Bool, // #290
      CouplingOptimizationSecond: common.UInt8, // #302
      SlowlyOpening: common.UInt8, // #314
      KneeVoltage: common.UInt8, // #326
      BadPixelGain: common.UInt16, // #338
      BadPointEnable_1: common.UInt8, // #350
      BadPointEnable_2: common.UInt8, // #362
      Gain: common.UInt16, // #374
      Current: common.Bool, // #386
      EnableToRemoveBadPoints: common.Bool, // #409
      BeginTime: common.UInt8, // #421
      ScanType, // #433
      RefreshTheNumberOfClusters: common.UInt16, // #457
      InsertFrameMode: common.Bool, // #469
      GclkNum: common.UInt16, // #481
      EnergySavingMode: common.UInt8, // #493
      CouplingOptimizationEnModel: common.UInt8, // #516
      GclkPLL: common.UInt8, // #542
      GclkFreqP: common.UInt8, // #554
      GclkFreqM: common.UInt8,
    }),
  ],
  'ChipICND1065LExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND1065LExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND1065L.decompiled.cs:167
 */
export const ChipICND1065LExtendProperty = t.intersection(
  [
    ChipICND1065LExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND1065LExtendProperty') }),
  ],
  'ChipICND1065LExtendProperty'
);
export interface ChipICND1065LExtendProperty extends t.TypeOf<typeof ChipICND1065LExtendProperty> {
  ScanType?: ScanTypeEnum;
}
