import * as t from 'io-ts';
import * as common from '../lib/common';
import {
  AutoAdjustRefreshRateType,
  AutoAdjustRefreshRateTypeEnum,
} from './AutoAdjustRefreshRateType'; // import
/**
 * Codec for interface {@link AutoAdjustRefreshRateParameters}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.LEDConfigAccessorBase.decompiled.cs:32
 */
export const AutoAdjustRefreshRateParameters = t.intersection(
  [
    t.type({
      AdjustRateType: common.withDefault(AutoAdjustRefreshRateType, 'R_60'), // #59
      TotalUnitNum: common.Int32_0, // #71
      TotalGclkUnitNumPerScan: common.UInt16_0, // #83
      RefNumPerVs: common.Int32_0, // #95
      GCLKRate: common.UInt8_0, // #107
      IsEnableTranCntNum: common.Bool_false, // #119
      M1TranCntNum: common.Int32_3, // #131
      M2TranCntNum: common.Int32_3, // #143
      LightTime: common.Int32_2650, // #155
      LightTimeNum2: common.Int32_2650,
    }),
    t.partial({}),
  ],
  'AutoAdjustRefreshRateParameters'
);
export interface AutoAdjustRefreshRateParameters
  extends t.TypeOf<typeof AutoAdjustRefreshRateParameters> {
  AdjustRateType: AutoAdjustRefreshRateTypeEnum;
}
