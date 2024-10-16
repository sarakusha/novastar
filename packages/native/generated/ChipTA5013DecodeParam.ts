import * as t from 'io-ts';
import * as common from '../lib/common';
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipTA5013DecodeParamBase = t.intersection(
  [
    DecodeChipParamBase,
    t.type({
      Registor: common.UInt8_8,
    }),
    t.partial({
      DecodeChipType: DecodeType, // #41
      IsNewDecodeType: common.Bool, // #43
      ShadowEliminationPotentialLevel: common.Int32,
    }),
  ],
  'ChipTA5013DecodeParamBase'
);
/**
 * Codec for {@link ChipTA5013DecodeParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_TA5013.decompiled.cs:34
 */
export const ChipTA5013DecodeParam = t.intersection(
  [ChipTA5013DecodeParamBase, t.partial({ '@_xsi:type': t.literal('ChipTA5013DecodeParam') })],
  'ChipTA5013DecodeParam'
);
export interface ChipTA5013DecodeParam extends t.TypeOf<typeof ChipTA5013DecodeParam> {
  DecodeChipType?: DecodeTypeEnum;
}
