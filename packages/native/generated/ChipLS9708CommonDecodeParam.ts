import * as t from 'io-ts';
import * as common from '../lib/common';
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipLS9708CommonDecodeParamBase = t.intersection(
  [
    DecodeChipParamBase,
    t.type({
      Register: common.UInt8_12,
    }),
    t.partial({
      DecodeChipType: DecodeType, // #41
      IsNewDecodeType: common.Bool, // #43
      ShadowEliminationVoltage: common.UInt8,
    }),
  ],
  'ChipLS9708CommonDecodeParamBase'
);
/**
 * Codec for {@link ChipLS9708CommonDecodeParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_LS9708_Common.decompiled.cs:34
 */
export const ChipLS9708CommonDecodeParam = t.intersection(
  [
    ChipLS9708CommonDecodeParamBase,
    t.partial({ '@_xsi:type': t.literal('ChipLS9708CommonDecodeParam') }),
  ],
  'ChipLS9708CommonDecodeParam'
);
export interface ChipLS9708CommonDecodeParam extends t.TypeOf<typeof ChipLS9708CommonDecodeParam> {
  DecodeChipType?: DecodeTypeEnum;
}
