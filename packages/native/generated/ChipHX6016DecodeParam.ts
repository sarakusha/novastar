import * as t from 'io-ts';
import * as common from '../lib/common';
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipHX6016DecodeParamBase = t.intersection(
  [
    DecodeChipParamBase,
    t.type({
      Registor: common.UInt8_15,
    }),
    t.partial({
      DecodeChipType: DecodeType, // #38
      IsNewDecodeType: common.Bool, // #42
      BlankVoltageLevel: common.UInt8,
    }),
  ],
  'ChipHX6016DecodeParamBase'
);
/**
 * Codec for {@link ChipHX6016DecodeParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_HX6016.decompiled.cs:34
 */
export const ChipHX6016DecodeParam = t.intersection(
  [ChipHX6016DecodeParamBase, t.partial({ '@_xsi:type': t.literal('ChipHX6016DecodeParam') })],
  'ChipHX6016DecodeParam'
);
export interface ChipHX6016DecodeParam extends t.TypeOf<typeof ChipHX6016DecodeParam> {
  DecodeChipType?: DecodeTypeEnum;
}
