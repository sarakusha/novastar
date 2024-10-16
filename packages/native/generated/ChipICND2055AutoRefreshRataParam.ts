import * as t from 'io-ts';
import * as common from '../lib/common';
import { AutoAdjustFreqConfigMode, AutoAdjustFreqConfigModeEnum } from './AutoAdjustFreqConfigMode'; // import
import { ChipAutoAdjustRefreshRateParamBase } from './ChipAutoAdjustRefreshRateParamBase'; // import
import { ChipType, ChipTypeEnum } from './ChipType';
 // import
export const ChipICND2055AutoRefreshRataParamBase = t.intersection(
  [
    ChipAutoAdjustRefreshRateParamBase,
    t.partial({
      ChipType, // #90
      ChipLibVersion: common.UInt8, // #92
      ConfigMode: AutoAdjustFreqConfigMode, // #94
      AutoAdjustParamAddress: common.UInt32, // #96
      AutoAdjustParamDataLen: common.Int32, // #98
    }),
  ],
  'ChipICND2055AutoRefreshRataParamBase'
);
/**
 * Codec for {@link ChipICND2055AutoRefreshRataParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2055.decompiled.cs:87
 */
export const ChipICND2055AutoRefreshRataParam = t.intersection(
  [
    ChipICND2055AutoRefreshRataParamBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2055AutoRefreshRataParam') }),
  ],
  'ChipICND2055AutoRefreshRataParam'
);
export interface ChipICND2055AutoRefreshRataParam
  extends t.TypeOf<typeof ChipICND2055AutoRefreshRataParam> {
  ChipType?: ChipTypeEnum;
  ConfigMode?: AutoAdjustFreqConfigModeEnum;
}
