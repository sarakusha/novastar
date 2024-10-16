import * as t from 'io-ts';
import { DateFromISOString } from 'io-ts-types';
import * as common from '../lib/common';
import { SmartBrightAdjustType, SmartBrightAdjustTypeEnum } from './SmartBrightAdjustType'; // import
/**
 * Codec for interface {@link OneSmartBrightEasyConfig}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:73196
 */
export const OneSmartBrightEasyConfig = t.intersection(
  [
    t.type({
      IsConfigEnable: common.Bool_true, // #73310
      CustomDayCollection: common.XMLArray(t.string, 'DayOfWeek'),
    }),
    t.partial({
      StartTime: DateFromISOString, // #73232
      ScheduleType: SmartBrightAdjustType, // #73245
      IsColorTemp: common.Bool, // #73258
      ColorTempValue: t.string, // #73271
      BrightPercent: common.Numeric, // #73284
      IsEnableGamma: common.Bool, // #73297
      GammaValue: common.Numeric, // #73323
      IsHasAdjusted: common.Bool,
    }),
  ],
  'OneSmartBrightEasyConfig'
);
export interface OneSmartBrightEasyConfig extends t.TypeOf<typeof OneSmartBrightEasyConfig> {
  ScheduleType?: SmartBrightAdjustTypeEnum;
}
