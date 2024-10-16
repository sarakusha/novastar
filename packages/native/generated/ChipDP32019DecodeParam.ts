import * as t from 'io-ts';
import * as common from '../lib/common';
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipDP32019DecodeParamBase = t.intersection(
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
  'ChipDP32019DecodeParamBase'
);
/**
 * Codec for {@link ChipDP32019DecodeParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_DP32019.decompiled.cs:34
 */
export const ChipDP32019DecodeParam = t.intersection(
  [ChipDP32019DecodeParamBase, t.partial({ '@_xsi:type': t.literal('ChipDP32019DecodeParam') })],
  'ChipDP32019DecodeParam'
);
export interface ChipDP32019DecodeParam extends t.TypeOf<typeof ChipDP32019DecodeParam> {
  DecodeChipType?: DecodeTypeEnum;
}
