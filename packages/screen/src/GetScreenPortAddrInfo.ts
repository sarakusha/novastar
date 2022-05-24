import { makeStruct } from '@novastar/native/lib/common';
import { ScreenPortAddrInfo } from '@novastar/native/lib/generated/ScreenPortAddrInfo';
import range from 'lodash/range';

import {
  groupByProps,
  hasProps,
  isSimpleScreen,
  isStandardScreen,
  LEDDisplayInfo,
  notEmpty,
} from './common';

const GroupKeys = ['SenderIndex', 'PortIndex'] as const;
const groupBySenderPort = groupByProps(...GroupKeys);
const notEmptySenderPort = hasProps(...GroupKeys);

export default function GetScreenPortAddrInfo(scr: LEDDisplayInfo) {
  if (isSimpleScreen(scr)) {
    const { PortCols = 0, PortRows = 0, PortScanBdInfoList = [] } = scr;
    return range(PortCols * PortRows).map(index => {
      const {
        ScanBdBegColNo = 0,
        ScanBdEndColNo = 0,
        ScanBdBegRowNo = 0,
        ScanBdEndRowNo = 0,
        PortIndex = 0,
      } = PortScanBdInfoList[index] ?? {};
      const cols = ScanBdEndColNo - ScanBdBegColNo;
      const rows = ScanBdEndRowNo - ScanBdBegRowNo;
      const count = cols * rows;
      return makeStruct(ScreenPortAddrInfo, {
        SenderIndex: scr.SenderIndex ?? 0,
        PortIndex,
        LoadScannerCount: count,
        MinConnectIndex: 0,
        MaxConnectIndex: count - 1,
      });
    });
  }
  const list = (isStandardScreen(scr) ? scr.ScannerRegionList : scr.ScanBoardRegionInfoList) ?? [];
  const filtered = list.filter(notEmptySenderPort).filter(({ SenderIndex }) => SenderIndex !== 255);
  return groupBySenderPort(filtered).map(([group, regions]) => {
    const connections = regions.map(({ ConnectIndex }) => ConnectIndex).filter(notEmpty);
    return makeStruct(ScreenPortAddrInfo, {
      ...group,
      LoadScannerCount: regions.length,
      MinConnectIndex: Math.min(...connections),
      MaxConnectIndex: Math.max(...connections),
    });
  });
}
