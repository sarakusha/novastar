import * as t from 'io-ts';
import * as common from '../lib/common';
import { AutoAdjustFreqConfigMode, AutoAdjustFreqConfigModeEnum } from './AutoAdjustFreqConfigMode'; // import
import { ChipAutoAdjustRefreshRateParamBase } from './ChipAutoAdjustRefreshRateParamBase'; // import
import { ChipType, ChipTypeEnum } from './ChipType';
 // import
export const ChipSCL8080AutoRefreshRataParamBase = t.intersection(
  [
    ChipAutoAdjustRefreshRateParamBase,
    t.partial({
      ChipType, // #51
      ChipLibVersion: common.UInt8, // #53
      ConfigMode: AutoAdjustFreqConfigMode, // #55
      AutoAdjustParamAddress: common.UInt32, // #57
      AutoAdjustParamDataLen: common.Int32, // #59
    }),
  ],
  'ChipSCL8080AutoRefreshRataParamBase'
);
/**
 * Codec for {@link ChipSCL8080AutoRefreshRataParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSCL8080.decompiled.cs:48
 */
export const ChipSCL8080AutoRefreshRataParam = t.intersection(
  [
    ChipSCL8080AutoRefreshRataParamBase,
    t.partial({ '@_xsi:type': t.literal('ChipSCL8080AutoRefreshRataParam') }),
  ],
  'ChipSCL8080AutoRefreshRataParam'
);
export interface ChipSCL8080AutoRefreshRataParam
  extends t.TypeOf<typeof ChipSCL8080AutoRefreshRataParam> {
  ChipType?: ChipTypeEnum;
  ConfigMode?: AutoAdjustFreqConfigModeEnum;
}
