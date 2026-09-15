import path from 'path';

import type { ScanBoardProperty } from '@novastar/native/ScanBoardProperty';

// import sortBy from 'lodash/sortBy';
// import { notEmptyProps } from './common';
import { encodeScanBoardProperty, ScanboardData } from './ScanboardData';
import { loadScanBoardConfig } from './configs';

const offsets = ScanboardData.getOffsets();

// console.log(Object.fromEntries(sortBy(Object.entries(offsets), ([_, offset]) => offset)));

describe('ScanboardData', () => {
  test('offsets', () => {
    expect(offsets).toMatchObject({
      MonitorRGBCode: 6,
      DriverChipType: 12,
      DataGroupSequence: 17,
      ModuleCols: 21,
      ModCascadeType: 28,
      LogicalDataGroupNum: 34,
      GrayDepth: 37,
      RefNumPerVs: 39,
      Gain3: 113,
      Gain1: 141,
      LogicalShiftUnitNum: 264,
      Gain2: 266,
      ScanSequenceAdjustEn: 274,
      Gain4: 277,
      EnFrameTimeMgt: 283,
      Gain5: 338,
      Gain6: 344,
      Gain7: 350,
      ChannelEnableData: 340,
      EnableDirectMode: 367,
      BrightPriorityMode: 369,
      AutoOrManual5252ResetSwitch: 422,
      IntervalDate5252: 424,
    });
  });
  test('encode', () => {
    const pathname = path.resolve(__dirname, '../../../cfg/Q8_ICND2153_40x40.rcfgx');
    const scanBdProp: ScanBoardProperty = loadScanBoardConfig(pathname)[0];
    const data = encodeScanBoardProperty(scanBdProp);
    expect(data.length).toBeGreaterThan(0);
  });
});
