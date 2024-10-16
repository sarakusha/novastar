import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipFM6555ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LEN: common.Int32_48, // #1016
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      ShadowEliminationLevel: common.UInt8, // #1020
      ShadowEliminationTime: common.UInt8, // #1032
      LowAshColorCompensation: common.UInt8, // #1044
      LowAshFirstLineDarkCompensationTimeFineTuningEn: common.Bool, // #1056
      LowAshFirstLineDarkCompensation: common.UInt8, // #1068
      LowAshFirstLineDarkCompensationTime: common.UInt8, // #1090
      CouplingOptimization1: common.UInt8, // #1102
      CouplingOptimization2: common.UInt8, // #1114
      CouplingOptimization2_Enable: common.Bool, // #1126
      SlowlyOpen: common.UInt8, // #1138
      InflectionPointVoltage: common.UInt8, // #1150
      CurrentGain: common.UInt16, // #1162
      IsUseNewModule: common.Bool, // #1174
      ChipLibVersion: common.UInt8,
    }),
  ],
  'ChipFM6555ExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6555ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipFM6555.decompiled.cs:1013
 */
export const ChipFM6555ExtendProperty = t.intersection(
  [
    ChipFM6555ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6555ExtendProperty') }),
  ],
  'ChipFM6555ExtendProperty'
);
export interface ChipFM6555ExtendProperty extends t.TypeOf<typeof ChipFM6555ExtendProperty> {}
