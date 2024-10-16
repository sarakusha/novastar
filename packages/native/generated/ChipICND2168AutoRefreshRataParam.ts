import * as t from 'io-ts';
import * as common from '../lib/common';
import { AutoAdjustFreqConfigMode, AutoAdjustFreqConfigModeEnum } from './AutoAdjustFreqConfigMode'; // import
import { ChipAutoAdjustRefreshRateParamBase } from './ChipAutoAdjustRefreshRateParamBase'; // import
import { ChipType, ChipTypeEnum } from './ChipType';
 // import
export const ChipICND2168AutoRefreshRataParamBase = t.intersection(
  [
    ChipAutoAdjustRefreshRateParamBase,
    t.partial({
      ChipType, // #1861
      ChipLibVersion: common.UInt8, // #1863
      ConfigMode: AutoAdjustFreqConfigMode, // #1865
      AutoAdjustParamAddress: common.UInt32, // #1867
      AutoAdjustParamDataLen: common.Int32, // #1875
    }),
  ],
  'ChipICND2168AutoRefreshRataParamBase'
);
/**
 * Codec for {@link ChipICND2168AutoRefreshRataParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2168.decompiled.cs:1859
 */
export const ChipICND2168AutoRefreshRataParam = t.intersection(
  [
    ChipICND2168AutoRefreshRataParamBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2168AutoRefreshRataParam') }),
  ],
  'ChipICND2168AutoRefreshRataParam'
);
export interface ChipICND2168AutoRefreshRataParam
  extends t.TypeOf<typeof ChipICND2168AutoRefreshRataParam> {
  ChipType?: ChipTypeEnum;
  ConfigMode?: AutoAdjustFreqConfigModeEnum;
}
