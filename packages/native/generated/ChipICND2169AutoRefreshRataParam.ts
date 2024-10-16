import * as t from 'io-ts';
import * as common from '../lib/common';
import { AutoAdjustFreqConfigMode, AutoAdjustFreqConfigModeEnum } from './AutoAdjustFreqConfigMode'; // import
import { ChipAutoAdjustRefreshRateParamBase } from './ChipAutoAdjustRefreshRateParamBase'; // import
import { ChipType, ChipTypeEnum } from './ChipType';
 // import
export const ChipICND2169AutoRefreshRataParamBase = t.intersection(
  [
    ChipAutoAdjustRefreshRateParamBase,
    t.partial({
      ChipType, // #4780
      ChipLibVersion: common.UInt8, // #4782
      ConfigMode: AutoAdjustFreqConfigMode, // #4784
      AutoAdjustParamAddress: common.UInt32, // #4786
      AutoAdjustParamDataLen: common.Int32, // #4794
    }),
  ],
  'ChipICND2169AutoRefreshRataParamBase'
);
/**
 * Codec for {@link ChipICND2169AutoRefreshRataParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2169.decompiled.cs:4778
 */
export const ChipICND2169AutoRefreshRataParam = t.intersection(
  [
    ChipICND2169AutoRefreshRataParamBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2169AutoRefreshRataParam') }),
  ],
  'ChipICND2169AutoRefreshRataParam'
);
export interface ChipICND2169AutoRefreshRataParam
  extends t.TypeOf<typeof ChipICND2169AutoRefreshRataParam> {
  ChipType?: ChipTypeEnum;
  ConfigMode?: AutoAdjustFreqConfigModeEnum;
}
