import * as t from 'io-ts';
import * as common from '../lib/common';
import { AutoAdjustFreqConfigMode, AutoAdjustFreqConfigModeEnum } from './AutoAdjustFreqConfigMode'; // import
import { ChipAutoAdjustRefreshRateParamBase } from './ChipAutoAdjustRefreshRateParamBase'; // import
import { ChipType, ChipTypeEnum } from './ChipType';
 // import
export const ChipMBI5850AutoRefreshRataParamBase = t.intersection(
  [
    ChipAutoAdjustRefreshRateParamBase,
    t.partial({
      ChipType, // #52
      ChipLibVersion: common.UInt8, // #54
      ConfigMode: AutoAdjustFreqConfigMode, // #56
      AutoAdjustParamAddress: common.UInt32, // #58
      AutoAdjustParamDataLen: common.Int32, // #60
    }),
  ],
  'ChipMBI5850AutoRefreshRataParamBase'
);
/**
 * Codec for {@link ChipMBI5850AutoRefreshRataParam}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5850.decompiled.cs:49
 */
export const ChipMBI5850AutoRefreshRataParam = t.intersection(
  [
    ChipMBI5850AutoRefreshRataParamBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5850AutoRefreshRataParam') }),
  ],
  'ChipMBI5850AutoRefreshRataParam'
);
export interface ChipMBI5850AutoRefreshRataParam
  extends t.TypeOf<typeof ChipMBI5850AutoRefreshRataParam> {
  ChipType?: ChipTypeEnum;
  ConfigMode?: AutoAdjustFreqConfigModeEnum;
}
