import * as t from 'io-ts';
import * as common from '../lib/common';
import { MSRvCardStatusType, MSRvCardStatusTypeEnum } from './MSRvCardStatusType'; // import
import { MSRvCardWorkType, MSRvCardWorkTypeEnum } from './MSRvCardWorkType'; // import
import { OneModuleInfo } from './OneModuleInfo'; // import
import { ScanBoardPropertyForMonitor } from './ScanBoardPropertyForMonitor'; // import
import { ScanBoardRegionInfo } from './ScanBoardRegionInfo'; // import
import { SmokeAlarmInfo } from './SmokeAlarmInfo'; // import
import { ValueInfo } from './ValueInfo'; // import
import { WorkStatusType, WorkStatusTypeEnum } from './WorkStatusType'; // import
/**
 * Codec for interface {@link ScannerMonitorData}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:76037
 */
export const ScannerMonitorData = t.intersection(
  [
    t.type({
      WorkStatus: common.withDefault(WorkStatusType, 'Unknown'), // #76056
      IsMasterCard: common.Bool_true, // #76070
      FanSpeedOfMonitorCardCollection: common.XMLArray(ValueInfo, 'ValueInfo'), // #76072
      VoltageOfMonitorCardCollection: common.XMLArray(ValueInfo, 'ValueInfo'), // #76074
      ModuleInfoList: common.XMLArray(OneModuleInfo, 'OneModuleInfo'),
    }),
    t.partial({
      SenderModuleID: common.UInt16, // #76040
      ScreenIndex: common.UInt8, // #76042
      IsConnectMC: common.Bool, // #76044
      IsConnectHubMC: common.Bool, // #76046
      ScanBdPorpertyInfo: ScanBoardPropertyForMonitor, // #76048
      SBRegionInfo: ScanBoardRegionInfo, // #76052
      MSRvCardStatus: MSRvCardStatusType, // #76054
      MSRvCardWork: MSRvCardWorkType, // #76058
      TemperatureOfScanCard: ValueInfo, // #76060
      HumidityOfScanCard: ValueInfo, // #76062
      VoltageOfScanCard: ValueInfo, // #76064
      TemperatureOfMonitorCard: ValueInfo, // #76066
      HumidityOfMonitorCard: ValueInfo, // #76068
      SmokeWarn: SmokeAlarmInfo, // #76076
      GeneralStatusData: common.UInt8, // #76078
      AnalogInputBytes: common.Base64, // #76080
      ModuleStatusBytes: common.Base64, // #76082
      MonitorDataBytes: common.Base64, // #76084
      MonitorGroupSwapEnable: common.Bool, // #76086
      MonitorGroupData: common.Base64, // #76088
      ScanBordMCUVersionName: t.string, // #76090
      ScanBordFPGAVersionName: t.string, // #76092
      ScanBordMoudId: t.string, // #76094
      MonitorScanBdBackPowerDataBytes: common.Base64, // #76096
      IsRedu: common.Bool,
    }),
  ],
  'ScannerMonitorData'
);
export interface ScannerMonitorData extends t.TypeOf<typeof ScannerMonitorData> {
  ScanBdPorpertyInfo?: ScanBoardPropertyForMonitor;
  SBRegionInfo?: ScanBoardRegionInfo;
  WorkStatus: WorkStatusTypeEnum;
  MSRvCardStatus?: MSRvCardStatusTypeEnum;
  MSRvCardWork?: MSRvCardWorkTypeEnum;
  TemperatureOfScanCard?: ValueInfo;
  HumidityOfScanCard?: ValueInfo;
  VoltageOfScanCard?: ValueInfo;
  TemperatureOfMonitorCard?: ValueInfo;
  HumidityOfMonitorCard?: ValueInfo;
  SmokeWarn?: SmokeAlarmInfo;
}
