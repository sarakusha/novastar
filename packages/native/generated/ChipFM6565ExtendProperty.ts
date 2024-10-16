import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipFM6565ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LEN: common.Int32_48, // #1026
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      ShadowEliminationLevel: common.UInt8, // #1030
      ShadowEliminationTime: common.UInt8, // #1042
      LowAshColorCompensation: common.UInt8, // #1054
      LowAshFirstLineDarkCompensationTimeFineTuningEn: common.Bool, // #1066
      LowAshFirstLineDarkCompensation: common.UInt8, // #1078
      LowAshFirstLineDarkCompensationTime: common.UInt8, // #1100
      CouplingOptimization1: common.UInt8, // #1112
      CouplingOptimization2: common.UInt8, // #1124
      CouplingOptimization2_Enable: common.Bool, // #1136
      SlowlyOpen: common.UInt8, // #1148
      InflectionPointVoltage: common.UInt8, // #1160
      CurrentGain: common.UInt16, // #1172
      IsUseNewModule: common.Bool, // #1184
      ChipLibVersion: common.UInt8,
    }),
  ],
  'ChipFM6565ExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6565ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipFM6565.decompiled.cs:1023
 */
export const ChipFM6565ExtendProperty = t.intersection(
  [
    ChipFM6565ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6565ExtendProperty') }),
  ],
  'ChipFM6565ExtendProperty'
);
export interface ChipFM6565ExtendProperty extends t.TypeOf<typeof ChipFM6565ExtendProperty> {}
