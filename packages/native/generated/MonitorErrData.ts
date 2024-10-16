import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link MonitorErrData}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:76261
 */
export const MonitorErrData = t.partial(
  {
    SBStatusErrCount: common.UInt32, // #76264
    SmokeAlarmCount: common.UInt32, // #76266
    TemperatureAlarmCount: common.UInt32, // #76268
    HumidityAlarmCount: common.UInt32, // #76270
    FanAlarmSwitchCount: common.UInt32, // #76272
    PowerAlarmSwitchCount: common.UInt32, // #76274
    SoketAlarmCount: common.UInt32, // #76276
    BackPowerAlarmCount: common.UInt32, // #76278
    MCStatusErrCount: common.UInt32, // #76280
    GeneralSwitchErrCount: common.UInt32, // #76282
    SenderDviExceptionCnt: common.UInt32, // #76284
    SmartModuleStateErrCount: common.UInt32, // #76286
  },
  'MonitorErrData'
);
export interface MonitorErrData extends t.TypeOf<typeof MonitorErrData> {}
