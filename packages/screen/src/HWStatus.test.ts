import { HWStatus } from './HWStatus';

describe('HWStatus', () => {
  it('offsets', () => {
    expect(HWStatus.getOffsets()).toEqual({
      tempInfoInScanCard: 0,
      humidityInfoInScanCard: 2,
      voltageInfoInScanCard: 3,
      isConnectMonitorCard: 32,
      tempInfoInMonitorCard: 39,
      humidityInfoInMonitorCard: 41,
      smokeWarnInfo: 42,
      fanSpeedInfoListMonitorCard: 43,
      valtageInfoListMonitorCard: 47,
      analogInputData: 56,
      generalStatus: 65,
      moduleStatusLow: 11,
      moduleStatusHigh: 66,
    });
    expect(HWStatus.baseSize).toBe(82);
  });
});
