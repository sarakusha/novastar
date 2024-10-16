import * as t from 'io-ts';
import * as common from '../lib/common';
import {
  AutoAdjustRefreshRateType,
  AutoAdjustRefreshRateTypeEnum,
} from './AutoAdjustRefreshRateType'; // import
/**
 * Codec for interface {@link AutoRateParameters}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.LEDConfigAccessorBase.decompiled.cs:209
 */
export const AutoRateParameters = t.intersection(
  [
    t.type({
      AdjustRateType: common.withDefault(AutoAdjustRefreshRateType, 'R_60'), // #246
      TotalGclkUnitNumPerScan: common.Int32_0, // #258
      RefNumPerVs: common.Int32_0, // #270
      GCLKRate: common.Int32_0, // #282
      DclkUnitCycle: common.Int32_0, // #294
      DclkPhase: common.Int32_3, // #306
      DclkHigh: common.Int32_3, // #318
      BlankUnitTime: common.Int32_0, // #330
      RowChangePoint: common.Int32_0, // #342
      CtrlEndPoint: common.Int32_0, // #354
      SyscycPerScan: common.Int32_0, // #366
      M: common.Int32_0, // #378
      N: common.Int32_0, // #390
      DIV: common.Int32_0, // #402
      G: common.Int32_0,
    }),
    t.partial({}),
  ],
  'AutoRateParameters'
);
export interface AutoRateParameters extends t.TypeOf<typeof AutoRateParameters> {
  AdjustRateType: AutoAdjustRefreshRateTypeEnum;
}
