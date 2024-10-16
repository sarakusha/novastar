import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link SmokeAlarmInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2117
 */
export const SmokeAlarmInfo = t.partial(
  {
    IsValid: common.Bool, // #2120
    IsSmokeAlarm: common.Bool, // #2122
  },
  'SmokeAlarmInfo'
);
export interface SmokeAlarmInfo extends t.TypeOf<typeof SmokeAlarmInfo> {}
