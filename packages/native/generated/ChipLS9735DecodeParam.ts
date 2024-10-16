import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipLS9735DecodeRegistor } from './ChipLS9735DecodeRegistor'; // import
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipLS9735DecodeParamBase = t.intersection(
  [
    DecodeChipParamBase,
    t.type({
      REG_LEN: common.Int32_21, // #693
      RegistorList: common.XMLArray(ChipLS9735DecodeRegistor, 'ChipLS9735DecodeRegistor'),
    }),
    t.partial({
      DecodeChipType: DecodeType, // #691
      IsNewDecodeType: common.Bool, // #695
      EliminationVoltage: common.UInt8, // #707
      LineBlankingClamp: common.UInt8, // #731
      LineBlankingPotential: common.UInt8, // #746
      SpecialDataLen: common.Int32, // #761
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipLS9735DecodeParamBase'
);
/**
 * Codec for {@link ChipLS9735DecodeParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_LS9735.decompiled.cs:682
 */
export const ChipLS9735DecodeParam = t.intersection(
  [ChipLS9735DecodeParamBase, t.partial({ '@_xsi:type': t.literal('ChipLS9735DecodeParam') })],
  'ChipLS9735DecodeParam'
);
export interface ChipLS9735DecodeParam extends t.TypeOf<typeof ChipLS9735DecodeParam> {
  DecodeChipType?: DecodeTypeEnum;
}
