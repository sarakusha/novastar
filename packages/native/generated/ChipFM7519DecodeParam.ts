import * as t from 'io-ts';
import * as common from '../lib/common';
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipFM7519DecodeParamBase = t.intersection(
  [
    DecodeChipParamBase,
    t.type({
      Registor: common.UInt8_10,
    }),
    t.partial({
      DecodeChipType: DecodeType, // #39
      IsNewDecodeType: common.Bool, // #43
      BlankVoltage: common.UInt8, // #46
      BlankMoudle: common.UInt8, // #58
      ShadowEliminationEnhancedEnable: common.Bool,
    }),
  ],
  'ChipFM7519DecodeParamBase'
);
/**
 * Codec for {@link ChipFM7519DecodeParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_FM7519.decompiled.cs:35
 */
export const ChipFM7519DecodeParam = t.intersection(
  [ChipFM7519DecodeParamBase, t.partial({ '@_xsi:type': t.literal('ChipFM7519DecodeParam') })],
  'ChipFM7519DecodeParam'
);
export interface ChipFM7519DecodeParam extends t.TypeOf<typeof ChipFM7519DecodeParam> {
  DecodeChipType?: DecodeTypeEnum;
}
