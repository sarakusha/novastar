import * as t from 'io-ts';
import * as common from '../lib/common';
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipSM5368DecodeParamBase = t.intersection(
  [
    DecodeChipParamBase,
    t.type({
      Registor: common.withDefault(common.UInt8, 40),
    }),
    t.partial({
      DecodeChipType: DecodeType, // #41
      IsNewDecodeType: common.Bool, // #43
      ShadowEliminationVoltage: common.UInt8,
    }),
  ],
  'ChipSM5368DecodeParamBase'
);
/**
 * Codec for {@link ChipSM5368DecodeParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_SM5368.decompiled.cs:34
 */
export const ChipSM5368DecodeParam = t.intersection(
  [ChipSM5368DecodeParamBase, t.partial({ '@_xsi:type': t.literal('ChipSM5368DecodeParam') })],
  'ChipSM5368DecodeParam'
);
export interface ChipSM5368DecodeParam extends t.TypeOf<typeof ChipSM5368DecodeParam> {
  DecodeChipType?: DecodeTypeEnum;
}
