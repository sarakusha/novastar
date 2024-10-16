import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCNS7263ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_4, // #2132
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      OPEN_DET: common.Bool, // #2136
      SCAN_LINE: common.UInt8, // #2149
      PWM_OPT: common.UInt8, // #2158
      PWM_REV: common.Bool, // #2172
      ADJ: common.UInt8, // #2185
      IGAIN: common.UInt16, // #2199
      ADJ_Enable: common.Bool, // #2233
      KeenPointVoltage: common.UInt8, // #2246
      FirstLineOffsetCompensation: common.UInt8, // #2260
      PWM_ALL: common.UInt8, // #2274
      PWM_ALL_Enable: common.Bool, // #2288
      FirstLineOffsetCompensation_Enable: common.Bool, // #2301
      OPEN_RST: common.Bool,
    }),
  ],
  'ChipCNS7263ExtendPropertyBase'
);
/**
 * Codec for {@link ChipCNS7263ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCNS7263.decompiled.cs:2129
 */
export const ChipCNS7263ExtendProperty = t.intersection(
  [
    ChipCNS7263ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCNS7263ExtendProperty') }),
  ],
  'ChipCNS7263ExtendProperty'
);
export interface ChipCNS7263ExtendProperty extends t.TypeOf<typeof ChipCNS7263ExtendProperty> {}
