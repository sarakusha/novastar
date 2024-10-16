import * as t from 'io-ts';
import * as common from '../lib/common';
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipLS9716CommonDecodeParamBase = t.intersection(
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
  'ChipLS9716CommonDecodeParamBase'
);
/**
 * Codec for {@link ChipLS9716CommonDecodeParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_LS9716_Common.decompiled.cs:34
 */
export const ChipLS9716CommonDecodeParam = t.intersection(
  [
    ChipLS9716CommonDecodeParamBase,
    t.partial({ '@_xsi:type': t.literal('ChipLS9716CommonDecodeParam') }),
  ],
  'ChipLS9716CommonDecodeParam'
);
export interface ChipLS9716CommonDecodeParam extends t.TypeOf<typeof ChipLS9716CommonDecodeParam> {
  DecodeChipType?: DecodeTypeEnum;
}
