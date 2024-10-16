import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipICND2263ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_16, // #50
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'), // #52
      RegisterArray1: common.XMLArray(common.UInt16, 'ushort'), // #54
      RegisterArray2: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      LowGrayCompensateGrade: common.UInt8, // #58
      ShadowEliminationLevel: common.UInt8, // #70
      TheFirstLineSlantsDarkCompensation: common.UInt8, // #82
      CrossCouplingToAdjust: common.UInt8, // #94
      EnableCouplingToAdjustEn: common.Bool, // #115
      EnableCouplingToAdjust: common.UInt8, // #127
      SlowOpen: common.Bool, // #139
      KneeVoltage: common.UInt8, // #151
      Gain: common.Int32, // #163
      Badpoint: common.Bool,
    }),
  ],
  'ChipICND2263ExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2263ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2263.decompiled.cs:47
 */
export const ChipICND2263ExtendProperty = t.intersection(
  [
    ChipICND2263ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2263ExtendProperty') }),
  ],
  'ChipICND2263ExtendProperty'
);
export interface ChipICND2263ExtendProperty extends t.TypeOf<typeof ChipICND2263ExtendProperty> {}
