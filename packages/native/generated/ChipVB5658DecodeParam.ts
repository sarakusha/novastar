import * as t from 'io-ts';
import * as common from '../lib/common';
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipVB5658DecodeParamBase = t.intersection(
  [
    DecodeChipParamBase,
    t.partial({
      DecodeChipType: DecodeType, // #37
      IsNewDecodeType: common.Bool, // #39
      EliminateShadowEnhance: common.Bool, // #41
      EliminateShadowElectricPotentialLevel: common.UInt8, // #43
    }),
  ],
  'ChipVB5658DecodeParamBase'
);
/**
 * Codec for {@link ChipVB5658DecodeParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_VB5658.decompiled.cs:33
 */
export const ChipVB5658DecodeParam = t.intersection(
  [ChipVB5658DecodeParamBase, t.partial({ '@_xsi:type': t.literal('ChipVB5658DecodeParam') })],
  'ChipVB5658DecodeParam'
);
export interface ChipVB5658DecodeParam extends t.TypeOf<typeof ChipVB5658DecodeParam> {
  DecodeChipType?: DecodeTypeEnum;
}
