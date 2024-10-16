import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipFM6565CEExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      FirstRegValue: common.UInt16, // #53
      SecondRegValue: common.UInt16, // #55
      LowAshUniformity: common.UInt8, // #57
      ShadowEliminationLevel: common.UInt8, // #69
      ShadowEliminationTime: common.UInt8, // #81
      LowAshColorCompensation: common.UInt8, // #93
      TheFirstSweepDarkCompensation: common.UInt8, // #105
      FineTuningTheFirstSweepDarkCompensationEnable: common.Bool, // #127
      TheFirstLineSlantsDarkCompensationTime: common.UInt8, // #139
      CouplingToAdjust: common.UInt8, // #151
      EnableCouplingToAdjust: common.Bool, // #163
      CouplingEnhancedMode: common.Bool, // #175
      CrossCouplingToAdjust: common.UInt8, // #187
      SlowlyOpening: common.UInt8, // #199
      KneeVoltage: common.UInt8, // #211
      Gain: common.UInt16, // #223
      EnergySavingMode: common.UInt8, // #235
      ScanType, // #257
      RefreshTheNumberOfClusters: common.UInt16, // #283
      SubFields: common.UInt8, // #311
      GclkNum: common.UInt16, // #323
      EnableToRemoveBadPoints: common.Bool, // #337
      GclkFreqP: common.UInt8, // #349
      GclkFreqM: common.UInt8, // #361
      GclkFreqN: common.UInt8,
    }),
  ],
  'ChipFM6565CEExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6565CEExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipFM6565CE.decompiled.cs:44
 */
export const ChipFM6565CEExtendProperty = t.intersection(
  [
    ChipFM6565CEExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6565CEExtendProperty') }),
  ],
  'ChipFM6565CEExtendProperty'
);
export interface ChipFM6565CEExtendProperty extends t.TypeOf<typeof ChipFM6565CEExtendProperty> {
  ScanType?: ScanTypeEnum;
}
