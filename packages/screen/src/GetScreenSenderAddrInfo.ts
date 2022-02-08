import { makeStruct } from '@novastar/native/build/main/common';
import { ScreenPortAddrInfo } from '@novastar/native/build/main/generated/ScreenPortAddrInfo';
import sumBy from 'lodash/sumBy';

import GetScreenPortAddrInfo from './GetScreenPortAddrInfo';
import { groupByProps, LEDDisplayInfo, notEmptyProps } from './common';

const groupBySender = groupByProps('SenderIndex');
const notEmptySender = notEmptyProps('SenderIndex');

export default function GetScreenSenderAddrInfo(scr: LEDDisplayInfo) {
  const ports = GetScreenPortAddrInfo(scr).filter(notEmptySender);
  return groupBySender(ports).map(([index, items]) =>
    makeStruct(ScreenPortAddrInfo, {
      ...index,
      LoadScannerCount: sumBy(items, 'LoadScannerCount'),
    })
  );
}
