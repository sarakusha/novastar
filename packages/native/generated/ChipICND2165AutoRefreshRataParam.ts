import * as t from 'io-ts';
import * as common from '../lib/common';
import { AutoAdjustFreqConfigMode, AutoAdjustFreqConfigModeEnum } from './AutoAdjustFreqConfigMode'; // import
import { ChipAutoAdjustRefreshRateParamBase } from './ChipAutoAdjustRefreshRateParamBase'; // import
import { ChipType, ChipTypeEnum } from './ChipType';
 // import
export const ChipICND2165AutoRefreshRataParamBase = t.intersection(
  [
    ChipAutoAdjustRefreshRateParamBase,
    t.partial({
      ChipType, // #3799
      ChipLibVersion: common.UInt8, // #3801
      ConfigMode: AutoAdjustFreqConfigMode, // #3803
      AutoAdjustParamAddress: common.UInt32, // #3805
      AutoAdjustParamDataLen: common.Int32, // #3813
    }),
  ],
  'ChipICND2165AutoRefreshRataParamBase'
);
/**
 * Codec for {@link ChipICND2165AutoRefreshRataParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2165.decompiled.cs:3797
 */
export const ChipICND2165AutoRefreshRataParam = t.intersection(
  [
    ChipICND2165AutoRefreshRataParamBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2165AutoRefreshRataParam') }),
  ],
  'ChipICND2165AutoRefreshRataParam'
);
export interface ChipICND2165AutoRefreshRataParam
  extends t.TypeOf<typeof ChipICND2165AutoRefreshRataParam> {
  ChipType?: ChipTypeEnum;
  ConfigMode?: AutoAdjustFreqConfigModeEnum;
}
