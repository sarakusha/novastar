import * as t from 'io-ts';
import * as common from '../lib/common';
import { AutoAdjustFreqConfigMode, AutoAdjustFreqConfigModeEnum } from './AutoAdjustFreqConfigMode'; // import
import { ChipAutoAdjustRefreshRateParamBase } from './ChipAutoAdjustRefreshRateParamBase'; // import
import { ChipType, ChipTypeEnum } from './ChipType';
 // import
export const ChipFM6565CEAutoRefreshRataParamBase = t.intersection(
  [
    ChipAutoAdjustRefreshRateParamBase,
    t.partial({
      ChipType, // #1227
      ChipLibVersion: common.UInt8, // #1229
      ConfigMode: AutoAdjustFreqConfigMode, // #1231
      AutoAdjustParamAddress: common.UInt32, // #1233
      AutoAdjustParamDataLen: common.Int32, // #1235
    }),
  ],
  'ChipFM6565CEAutoRefreshRataParamBase'
);
/**
 * Codec for {@link ChipFM6565CEAutoRefreshRataParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipFM6565CE.decompiled.cs:1224
 */
export const ChipFM6565CEAutoRefreshRataParam = t.intersection(
  [
    ChipFM6565CEAutoRefreshRataParamBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6565CEAutoRefreshRataParam') }),
  ],
  'ChipFM6565CEAutoRefreshRataParam'
);
export interface ChipFM6565CEAutoRefreshRataParam
  extends t.TypeOf<typeof ChipFM6565CEAutoRefreshRataParam> {
  ChipType?: ChipTypeEnum;
  ConfigMode?: AutoAdjustFreqConfigModeEnum;
}
