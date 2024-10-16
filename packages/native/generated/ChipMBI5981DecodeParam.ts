import * as t from 'io-ts';
import * as common from '../lib/common';
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipMBI5981DecodeParamBase = t.intersection(
  [
    DecodeChipParamBase,
    t.type({
      GhostEliminationLevel: common.UInt8_7,
    }),
    t.partial({
      DecodeChipType: DecodeType, // #258
      IsNewDecodeType: common.Bool,
    }),
  ],
  'ChipMBI5981DecodeParamBase'
);
/**
 * Codec for {@link ChipMBI5981DecodeParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_MBI5981.decompiled.cs:252
 */
export const ChipMBI5981DecodeParam = t.intersection(
  [ChipMBI5981DecodeParamBase, t.partial({ '@_xsi:type': t.literal('ChipMBI5981DecodeParam') })],
  'ChipMBI5981DecodeParam'
);
export interface ChipMBI5981DecodeParam extends t.TypeOf<typeof ChipMBI5981DecodeParam> {
  DecodeChipType?: DecodeTypeEnum;
}
