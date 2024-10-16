import * as t from 'io-ts';
import * as common from '../lib/common';
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipRT5958DecodeParamBase = t.intersection(
  [
    DecodeChipParamBase,
    t.partial({
      DecodeChipType: DecodeType, // #39
      IsNewDecodeType: common.Bool, // #41
    }),
  ],
  'ChipRT5958DecodeParamBase'
);
/**
 * Codec for {@link ChipRT5958DecodeParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_RT5958.decompiled.cs:35
 */
export const ChipRT5958DecodeParam = t.intersection(
  [ChipRT5958DecodeParamBase, t.partial({ '@_xsi:type': t.literal('ChipRT5958DecodeParam') })],
  'ChipRT5958DecodeParam'
);
export interface ChipRT5958DecodeParam extends t.TypeOf<typeof ChipRT5958DecodeParam> {
  DecodeChipType?: DecodeTypeEnum;
}
