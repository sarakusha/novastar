import * as t from 'io-ts';
import * as common from '../lib/common';
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipMBI5988DecodeParamBase = t.intersection(
  [
    DecodeChipParamBase,
    t.partial({
      DecodeChipType: DecodeType, // #687
      IsNewDecodeType: common.Bool, // #689
      FirstRegValue: common.UInt16, // #691
      SecondRegValue: common.UInt16, // #693
      ThirdRegValue: common.UInt16, // #695
      FourthRegValue: common.UInt16, // #697
      MY5988ICNumber: common.UInt16, // #699
      EliminateShortCircuit: common.Bool, // #701
      EliminateShortCircuitLevel: common.UInt8, // #713
      Overheating: common.Bool, // #725
      ICNumber: common.Int32, // #737
      ICNumberEn: common.Bool, // #749
    }),
  ],
  'ChipMBI5988DecodeParamBase'
);
/**
 * Codec for {@link ChipMBI5988DecodeParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_MBI5988.decompiled.cs:683
 */
export const ChipMBI5988DecodeParam = t.intersection(
  [ChipMBI5988DecodeParamBase, t.partial({ '@_xsi:type': t.literal('ChipMBI5988DecodeParam') })],
  'ChipMBI5988DecodeParam'
);
export interface ChipMBI5988DecodeParam extends t.TypeOf<typeof ChipMBI5988DecodeParam> {
  DecodeChipType?: DecodeTypeEnum;
}
