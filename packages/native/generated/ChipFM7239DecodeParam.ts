import * as t from 'io-ts';
import * as common from '../lib/common';
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipFM7239DecodeParamBase = t.intersection(
  [
    DecodeChipParamBase,
    t.partial({
      DecodeParamScan: common.Int32, // #49
      Registor_D0: common.UInt16, // #51
      Registor_D1: common.UInt16, // #53
      Registor_D2: common.UInt16, // #55
      Registor_D3: common.UInt16, // #57
      Registor_D4: common.UInt16, // #59
      Registor_D5: common.UInt16, // #61
      Registor_D6: common.UInt16, // #63
      Registor_D7: common.UInt16, // #65
      DecodeChipType: DecodeType, // #67
      IsNewDecodeType: common.Bool, // #69
      LineBlankPattern: common.UInt8, // #71
      LinePullDownVoltage: common.UInt8, // #83
      LinePullUpVoltage: common.UInt8, // #95
      LinePullDownPattern: common.UInt8, // #107
      LineChannelOutputPattern: common.UInt8, // #145
      LineRisingEdgeSlower: common.UInt8, // #157
      OpenOCP: common.Bool, // #195
      BlankTime: common.UInt8, // #207
      StartScan4: common.UInt8, // #219
      StartScan3: common.UInt8, // #251
      StartScan2: common.UInt8, // #279
      StartScan1: common.UInt8, // #307
      SpecialDataLen: common.Int32, // #320
      SpecialRegisterAddr: common.UInt32, // #322
    }),
  ],
  'ChipFM7239DecodeParamBase'
);
/**
 * Codec for {@link ChipFM7239DecodeParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_FM7239.decompiled.cs:35
 */
export const ChipFM7239DecodeParam = t.intersection(
  [ChipFM7239DecodeParamBase, t.partial({ '@_xsi:type': t.literal('ChipFM7239DecodeParam') })],
  'ChipFM7239DecodeParam'
);
export interface ChipFM7239DecodeParam extends t.TypeOf<typeof ChipFM7239DecodeParam> {
  DecodeChipType?: DecodeTypeEnum;
}
