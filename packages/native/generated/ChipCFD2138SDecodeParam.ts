import * as t from 'io-ts';
import * as common from '../lib/common';
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipCFD2138SDecodeParamBase = t.intersection(
  [
    DecodeChipParamBase,
    t.partial({
      DecodeChipType: DecodeType, // #39
      IsNewDecodeType: common.Bool, // #41
      RegByteOne: common.UInt8, // #43
      RegByteTwo: common.UInt8, // #45
      RegByteThree: common.UInt8, // #47
      BlankVoltage: common.UInt8, // #49
      BlankMoudle: common.UInt8, // #61
      RepeatDecodingEnable: common.Bool, // #73
      DiscountOfLightBoard: common.UInt8, // #85
      NumOfICsInSeries: common.UInt8, // #97
    }),
  ],
  'ChipCFD2138SDecodeParamBase'
);
/**
 * Codec for {@link ChipCFD2138SDecodeParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_CFD2138S.decompiled.cs:35
 */
export const ChipCFD2138SDecodeParam = t.intersection(
  [ChipCFD2138SDecodeParamBase, t.partial({ '@_xsi:type': t.literal('ChipCFD2138SDecodeParam') })],
  'ChipCFD2138SDecodeParam'
);
export interface ChipCFD2138SDecodeParam extends t.TypeOf<typeof ChipCFD2138SDecodeParam> {
  DecodeChipType?: DecodeTypeEnum;
}
