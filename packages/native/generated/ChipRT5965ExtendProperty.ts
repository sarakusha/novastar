import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipRT5965ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      FirstReg: common.UInt16, // #961
      SecondReg: common.UInt16, // #963
      ThirdReg: common.UInt16, // #965
      CurrentGain: common.UInt8, // #967
      CouplingEliminationLevel: common.UInt8, // #979
      CouplingEliminationEn: common.Bool, // #991
      FirstScanDarkEliminationLevel: common.UInt8, // #1003
      LowCompsentionOne: common.UInt8, // #1015
      LowCompsentionTwo: common.UInt8, // #1027
      GhostEliminationLevel: common.UInt8, // #1039
      ShadowEhancedModeEn: common.Bool, // #1051
      SlowOpen: common.Bool, // #1063
      OpenCircuitDetectionLevel: common.UInt8, // #1075
      PowerSavingModeEn: common.Bool, // #1087
      ChannelPowerSavingModeEn: common.Bool, // #1099
    }),
  ],
  'ChipRT5965ExtendPropertyBase'
);
/**
 * Codec for {@link ChipRT5965ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipRT5965.decompiled.cs:959
 */
export const ChipRT5965ExtendProperty = t.intersection(
  [
    ChipRT5965ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipRT5965ExtendProperty') }),
  ],
  'ChipRT5965ExtendProperty'
);
export interface ChipRT5965ExtendProperty extends t.TypeOf<typeof ChipRT5965ExtendProperty> {}
