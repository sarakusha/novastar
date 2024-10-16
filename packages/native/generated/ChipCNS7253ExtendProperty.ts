import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCNS7253ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RegFirst: common.UInt16, // #56
      RegSecond: common.UInt16, // #58
      RegThird: common.UInt16, // #60
      RegFourth: common.UInt16, // #62
      OPEN_DET: common.Bool, // #64
      SCAN_LINE: common.UInt8, // #77
      PWM_OPT: common.UInt8, // #86
      GCLK_DOUBLE: common.Bool, // #100
      PWM_GROUP: common.UInt16, // #113
      PWM_REV: common.Bool, // #126
      PartNumPerRefValue: common.UInt8, // #139
      ADJ: common.UInt8, // #152
      IGAIN: common.UInt16, // #166
      ADJ_Enable: common.Bool, // #200
      KeenPointVoltage: common.UInt8, // #213
      FirstLineOffsetCompensation: common.UInt8, // #227
      PWM_ALL: common.UInt8, // #241
      PWM_ALL_Enable: common.Bool, // #255
      FirstLineOffsetCompensation_Enable: common.Bool, // #268
      OPEN_RST: common.Bool, // #281
    }),
  ],
  'ChipCNS7253ExtendPropertyBase'
);
/**
 * Codec for {@link ChipCNS7253ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCNS7253.decompiled.cs:53
 */
export const ChipCNS7253ExtendProperty = t.intersection(
  [
    ChipCNS7253ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCNS7253ExtendProperty') }),
  ],
  'ChipCNS7253ExtendProperty'
);
export interface ChipCNS7253ExtendProperty extends t.TypeOf<typeof ChipCNS7253ExtendProperty> {}
