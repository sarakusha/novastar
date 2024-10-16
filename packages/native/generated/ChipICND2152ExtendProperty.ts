import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipICND2152ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegLength: common.Int32_6, // #48
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #64
      ChipLibVersion: common.UInt8, // #66
      BlankingLevel: common.UInt8, // #68
      BlankingEnhance: common.Bool, // #80
      CrossBoardCouplingOptimization: common.Bool, // #92
      TheFirstLineDarkCompensation: common.UInt8, // #104
      InflectionPointVoltage: common.UInt8, // #116
      SlowSpeedOpen: common.UInt8, // #128
      CurrentGain: common.UInt8,
    }),
  ],
  'ChipICND2152ExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2152ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2152.decompiled.cs:45
 */
export const ChipICND2152ExtendProperty = t.intersection(
  [
    ChipICND2152ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2152ExtendProperty') }),
  ],
  'ChipICND2152ExtendProperty'
);
export interface ChipICND2152ExtendProperty extends t.TypeOf<typeof ChipICND2152ExtendProperty> {}
