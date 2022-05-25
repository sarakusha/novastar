import path from 'path';

import { printBuffer } from '@novastar/codec';
import type { ScanBoardProperty } from '@novastar/native/ScanBoardProperty';

// import sortBy from 'lodash/sortBy';
// import { notEmptyProps } from './common';
import { encodeScanBoardProperty, ScanboardData } from './ScanboardData';
import { loadScanBoardConfig } from './configs';

const offsets = ScanboardData.getOffsets();

// console.log(Object.fromEntries(sortBy(Object.entries(offsets), ([_, offset]) => offset)));

describe('ScanboardData', () => {
  test('offsets', () => {
    expect(offsets).toHaveProperty('MonitorRGBCode', 6);
    expect(offsets).toHaveProperty('DriverChipType', 12);
    expect(offsets).toHaveProperty('DataGroupSequence', 17);
    expect(offsets).toHaveProperty('ModuleCols', 21);
    expect(offsets).toHaveProperty('ModCascadeType', 28);
    expect(offsets).toHaveProperty('LogicalDataGroupNum', 34);
    expect(offsets).toHaveProperty('GrayDepth', 37);
    expect(offsets).toHaveProperty('RefNumPerVs', 39);
    expect(offsets).toHaveProperty('LogicalShiftUnitNum', 232);
    expect(offsets).toHaveProperty('EnFrameTimeMgt', 251);
    expect(offsets).toHaveProperty('ScanSequenceAdjustEn', 242);
    expect(offsets).toHaveProperty('Gain1', 141);
    expect(offsets).toHaveProperty('Gain2', 234);
    expect(offsets).toHaveProperty('Gain3', 113);
    expect(offsets).toHaveProperty('Gain4', 245);
    expect(offsets).toHaveProperty('Gain5', 338);
    expect(offsets).toHaveProperty('Gain6', 344);
    expect(offsets).toHaveProperty('Gain7', 350);
    expect(offsets).toHaveProperty('ChannelEnableData', 340);
    expect(offsets).toHaveProperty('BrightPriorityMode', 369);
    expect(offsets).toHaveProperty('AutoOrManual5252ResetSwitch', 422);
    expect(offsets).toHaveProperty('IntervalDate5252', 424);
    expect(offsets).toHaveProperty('EnableDirectMode', 367);
    // expect(offsets).toHaveProperty();
    // expect(offsets).toHaveProperty();
    // expect(offsets).toHaveProperty();
    // expect(offsets).toHaveProperty();
    // expect(offsets).toHaveProperty();
    // expect(offsets).toHaveProperty();
    // expect(offsets).toHaveProperty();
    // expect(offsets).toHaveProperty();
    // expect(offsets).toHaveProperty();
    // expect(offsets).toHaveProperty();
  });
  test('encode', () => {
    const pathname = path.resolve(__dirname, '../../../cfg/Q8_ICND2153_40x40.rcfgx');
    const scanBdProp: ScanBoardProperty = loadScanBoardConfig(pathname)[0];
    const data = encodeScanBoardProperty(scanBdProp);
    console.log(printBuffer(data));
  });
});
