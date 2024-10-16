import * as t from 'io-ts';
import * as common from '../lib/common';
import { AutoAdjustFreqConfigMode, AutoAdjustFreqConfigModeEnum } from './AutoAdjustFreqConfigMode'; // import
import { ChipAutoAdjustRefreshRateParamBase } from './ChipAutoAdjustRefreshRateParamBase'; // import
import { ChipType, ChipTypeEnum } from './ChipType';
 // import
export const ChipICN2065AutoRefreshRataParamBase = t.intersection(
  [
    ChipAutoAdjustRefreshRateParamBase,
    t.partial({
      ChipType, // #49
      ChipLibVersion: common.UInt8, // #51
      ConfigMode: AutoAdjustFreqConfigMode, // #53
      AutoAdjustParamAddress: common.UInt32, // #55
      AutoAdjustParamDataLen: common.Int32, // #57
    }),
  ],
  'ChipICN2065AutoRefreshRataParamBase'
);
/**
 * Codec for {@link ChipICN2065AutoRefreshRataParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2065.decompiled.cs:46
 */
export const ChipICN2065AutoRefreshRataParam = t.intersection(
  [
    ChipICN2065AutoRefreshRataParamBase,
    t.partial({ '@_xsi:type': t.literal('ChipICN2065AutoRefreshRataParam') }),
  ],
  'ChipICN2065AutoRefreshRataParam'
);
export interface ChipICN2065AutoRefreshRataParam
  extends t.TypeOf<typeof ChipICN2065AutoRefreshRataParam> {
  ChipType?: ChipTypeEnum;
  ConfigMode?: AutoAdjustFreqConfigModeEnum;
}
