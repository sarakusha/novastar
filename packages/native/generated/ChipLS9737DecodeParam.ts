import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipLS9737DecodeRegistor } from './ChipLS9737DecodeRegistor'; // import
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipLS9737DecodeParamBase = t.intersection(
  [
    DecodeChipParamBase,
    t.type({
      REG_LEN: common.Int32_21, // #816
      RegistorList: common.XMLArray(ChipLS9737DecodeRegistor, 'ChipLS9737DecodeRegistor'), // #854
      FirstLineEliminationCompsention: common.UInt8_5,
    }),
    t.partial({
      DecodeChipType: DecodeType, // #814
      IsNewDecodeType: common.Bool, // #818
      EliminationVoltage: common.UInt8, // #830
      ScanCount: common.UInt8, // #869
      SpecialDataLen: common.Int32, // #881
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipLS9737DecodeParamBase'
);
/**
 * Codec for {@link ChipLS9737DecodeParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_LS9737.decompiled.cs:803
 */
export const ChipLS9737DecodeParam = t.intersection(
  [ChipLS9737DecodeParamBase, t.partial({ '@_xsi:type': t.literal('ChipLS9737DecodeParam') })],
  'ChipLS9737DecodeParam'
);
export interface ChipLS9737DecodeParam extends t.TypeOf<typeof ChipLS9737DecodeParam> {
  DecodeChipType?: DecodeTypeEnum;
}
