import * as t from 'io-ts';
import * as common from '../lib/common';
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipDP32020DecodeParamBase = t.intersection(
  [
    DecodeChipParamBase,
    t.type({
      Registor: common.UInt8_8,
    }),
    t.partial({
      DecodeChipType: DecodeType, // #41
      IsNewDecodeType: common.Bool, // #43
      BlankVoltage: common.UInt8, // #45
      BlankPattern: common.Bool,
    }),
  ],
  'ChipDP32020DecodeParamBase'
);
/**
 * Codec for {@link ChipDP32020DecodeParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_DP32020.decompiled.cs:34
 */
export const ChipDP32020DecodeParam = t.intersection(
  [ChipDP32020DecodeParamBase, t.partial({ '@_xsi:type': t.literal('ChipDP32020DecodeParam') })],
  'ChipDP32020DecodeParam'
);
export interface ChipDP32020DecodeParam extends t.TypeOf<typeof ChipDP32020DecodeParam> {
  DecodeChipType?: DecodeTypeEnum;
}
