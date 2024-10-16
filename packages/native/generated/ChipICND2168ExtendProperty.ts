import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND2168ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegLength: common.Int32_48, // #234
      RegBadPointLength: common.Int32_7, // #236
      RegValue: common.XMLArray(common.UInt16, 'ushort'), // #238
      RegBadPoint: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      BlankingGrade: common.UInt8, // #262
      BlankingTime: common.UInt8, // #274
      LowGrayOptimization: common.UInt8, // #286
      TheFirstDarkCompensation: common.UInt8, // #298
      TheFirstLineDarkCompensationAdjust: common.UInt8, // #311
      TheFirstLineDarkCompensationTime: common.UInt8, // #323
      TheFirstLineDarkEnhanceOneEnabled: common.Bool, // #335
      TheFirstLineDarkEnhanceOne: common.UInt8, // #347
      TheFirstLineDarkEnhanceEnabledTwo: common.Bool, // #359
      TheFirstLineDarkEnhanceTwo: common.UInt8, // #371
      TheFirstLineDarkEnhanceTwoAdjust: common.UInt8, // #384
      LowGrayColorCompensation: common.UInt8, // #396
      CouplingEnhance: common.Bool, // #409
      CouplingOptimizationOne: common.UInt8, // #421
      CouplingOptimizationTwoEnabled: common.Bool, // #433
      CouplingOptimizationTwo: common.UInt8, // #445
      CouplingOptimizationTowAdjustEnabled: common.Bool, // #457
      CouplingOptimizationTwoAdjust: common.UInt8, // #469
      SlowSpeedOpen: common.UInt8, // #481
      InflectionPointVoltage: common.UInt8, // #493
      GridentOptimization: common.Bool, // #505
      Gain: common.UInt16, // #517
      CurrentVerifiCationMode: common.Bool, // #529
      BlackScreenEnergyConservation: common.UInt8, // #544
      ScanType, // #570
      RefreshTheNumberOfClusters: common.UInt16, // #594
      GclkNumber: common.Int32, // #606
      GclkFreqP: common.UInt8, // #618
      GclkFreqM: common.UInt8, // #630
      GclkFreqN: common.UInt8,
    }),
  ],
  'ChipICND2168ExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2168ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2168.decompiled.cs:231
 */
export const ChipICND2168ExtendProperty = t.intersection(
  [
    ChipICND2168ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2168ExtendProperty') }),
  ],
  'ChipICND2168ExtendProperty'
);
export interface ChipICND2168ExtendProperty extends t.TypeOf<typeof ChipICND2168ExtendProperty> {
  ScanType?: ScanTypeEnum;
}
