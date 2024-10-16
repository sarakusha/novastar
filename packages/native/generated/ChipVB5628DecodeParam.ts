import * as t from 'io-ts';
import * as common from '../lib/common';
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipVB5628DecodeParamBase = t.intersection(
  [
    DecodeChipParamBase,
    t.partial({
      DecodeChipType: DecodeType, // #37
      IsNewDecodeType: common.Bool, // #39
      EliminateShadowElectricPotentialLevel: common.UInt8, // #41
    }),
  ],
  'ChipVB5628DecodeParamBase'
);
/**
 * Codec for {@link ChipVB5628DecodeParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_VB5628.decompiled.cs:33
 */
export const ChipVB5628DecodeParam = t.intersection(
  [ChipVB5628DecodeParamBase, t.partial({ '@_xsi:type': t.literal('ChipVB5628DecodeParam') })],
  'ChipVB5628DecodeParam'
);
export interface ChipVB5628DecodeParam extends t.TypeOf<typeof ChipVB5628DecodeParam> {
  DecodeChipType?: DecodeTypeEnum;
}
