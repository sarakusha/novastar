import * as t from 'io-ts';
import * as common from '../lib/common';
import { AutoAdjustFreqConfigMode, AutoAdjustFreqConfigModeEnum } from './AutoAdjustFreqConfigMode'; // import
import { SingleRefreshRateParam } from './SingleRefreshRateParam'; // import
/**
 * Codec for interface {@link ChipAutoAdjustRefreshRateParamBase}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:30271
 */
export const ChipAutoAdjustRefreshRateParamBase = t.intersection(
  [
    t.type({
      ChipAutoRefreshRateParamList: common.XMLArray(
        SingleRefreshRateParam,
        'SingleRefreshRateParam'
      ),
    }),
    t.partial({
      ScanCount: common.UInt8, // #30281
      ConfigMode: AutoAdjustFreqConfigMode,
    }),
  ],
  'ChipAutoAdjustRefreshRateParamBase'
);
export interface ChipAutoAdjustRefreshRateParamBase
  extends t.TypeOf<typeof ChipAutoAdjustRefreshRateParamBase> {
  ConfigMode?: AutoAdjustFreqConfigModeEnum;
}
