import * as t from 'io-ts';
import * as common from '../lib/common';
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipDP32129DecodeParamBase = t.intersection(
  [
    DecodeChipParamBase,
    t.partial({
      RegByteOne: common.UInt8, // #38
      RegByteTwo: common.UInt8, // #40
      DecodeChipType: DecodeType, // #42
      IsNewDecodeType: common.Bool, // #44
      OpenDetectionEnhancedMode: common.UInt8, // #46
      CouplingEnhanceMode: common.UInt8, // #58
      ShadowEliminationConfig: common.UInt8, // #70
      RowScanMode: common.UInt8, // #82
      ArbitrarilyScanNum: common.UInt8, // #94
    }),
  ],
  'ChipDP32129DecodeParamBase'
);
/**
 * Codec for {@link ChipDP32129DecodeParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_DP32129.decompiled.cs:34
 */
export const ChipDP32129DecodeParam = t.intersection(
  [ChipDP32129DecodeParamBase, t.partial({ '@_xsi:type': t.literal('ChipDP32129DecodeParam') })],
  'ChipDP32129DecodeParam'
);
export interface ChipDP32129DecodeParam extends t.TypeOf<typeof ChipDP32129DecodeParam> {
  DecodeChipType?: DecodeTypeEnum;
}
