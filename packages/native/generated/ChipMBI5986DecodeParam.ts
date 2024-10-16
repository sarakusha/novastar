import * as t from 'io-ts';
import * as common from '../lib/common';
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipMBI5986DecodeParamBase = t.intersection(
  [
    DecodeChipParamBase,
    t.type({
      EliminateShortCircuitLevel: common.UInt8_0,
    }),
    t.partial({
      DecodeChipType: DecodeType, // #41
      IsNewDecodeType: common.Bool,
    }),
  ],
  'ChipMBI5986DecodeParamBase'
);
/**
 * Codec for {@link ChipMBI5986DecodeParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_MBI5986.decompiled.cs:35
 */
export const ChipMBI5986DecodeParam = t.intersection(
  [ChipMBI5986DecodeParamBase, t.partial({ '@_xsi:type': t.literal('ChipMBI5986DecodeParam') })],
  'ChipMBI5986DecodeParam'
);
export interface ChipMBI5986DecodeParam extends t.TypeOf<typeof ChipMBI5986DecodeParam> {
  DecodeChipType?: DecodeTypeEnum;
}
