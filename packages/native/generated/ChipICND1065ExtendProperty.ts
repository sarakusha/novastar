import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND1065ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      ShadowEliminationLevel: common.UInt8, // #56
      ShadowEliminationTime: common.UInt8, // #68
      ShadowBeginEliminationTime: common.UInt8, // #80
      LowGary: common.UInt8, // #82
      TheFirstSweepDarkCompensation: common.UInt8, // #105
      TheFirstLineSlantsDarkCompensationTime: common.UInt8, // #117
      LowAshColorCompensation: common.UInt8, // #129
      CouplingToAdjust: common.UInt8, // #141
      EnableCouplingToAdjust: common.Bool, // #153
      CrossCouplingToAdjust: common.UInt8, // #165
      SlowlyOpening: common.UInt8, // #177
      KneeVoltage: common.UInt8, // #208
      BeginTime: common.UInt8, // #220
      Current: common.Bool, // #232
      Gain: common.UInt16, // #257
      ScanType, // #269
      ChangeVer: common.UInt8, // #293
      LowAshUniformity: common.UInt8, // #305
      RefreshTheNumberOfClusters: common.UInt16, // #339
      GclkNum: common.UInt16, // #358
      EnergySavingMode: common.UInt8, // #370
      EnableToRemoveBadPoints: common.Bool, // #388
      GclkFreqP: common.UInt8, // #404
      GclkFreqM: common.UInt8, // #421
      GclkFreqN: common.UInt8,
    }),
  ],
  'ChipICND1065ExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND1065ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND1065.decompiled.cs:49
 */
export const ChipICND1065ExtendProperty = t.intersection(
  [
    ChipICND1065ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND1065ExtendProperty') }),
  ],
  'ChipICND1065ExtendProperty'
);
export interface ChipICND1065ExtendProperty extends t.TypeOf<typeof ChipICND1065ExtendProperty> {
  ScanType?: ScanTypeEnum;
}
