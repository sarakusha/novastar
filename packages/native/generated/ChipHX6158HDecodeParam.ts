import * as t from 'io-ts';
import * as common from '../lib/common';
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipHX6158HDecodeParamBase = t.intersection(
  [
    DecodeChipParamBase,
    t.type({
      ShadowEliminationPotentialLevel: common.UInt8_4, // #397
      ShadowEliminationEnhancedEnable: common.Bool_true,
    }),
    t.partial({
      DecodeChipType: DecodeType, // #393
      IsNewDecodeType: common.Bool,
    }),
  ],
  'ChipHX6158HDecodeParamBase'
);
/**
 * Codec for {@link ChipHX6158HDecodeParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_HX6158H.decompiled.cs:385
 */
export const ChipHX6158HDecodeParam = t.intersection(
  [ChipHX6158HDecodeParamBase, t.partial({ '@_xsi:type': t.literal('ChipHX6158HDecodeParam') })],
  'ChipHX6158HDecodeParam'
);
export interface ChipHX6158HDecodeParam extends t.TypeOf<typeof ChipHX6158HDecodeParam> {
  DecodeChipType?: DecodeTypeEnum;
}
