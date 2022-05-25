import { ScreenPortAddrInfo } from '@novastar/native/ScreenPortAddrInfo';
import { makeStruct } from '@novastar/native/common';
import sumBy from 'lodash/sumBy';

import GetScreenPortAddrInfo from './GetScreenPortAddrInfo';
import { groupByProps, hasProps, LEDDisplayInfo } from './common';

const groupBySender = groupByProps('SenderIndex');
const notEmptySender = hasProps('SenderIndex');

export default function GetScreenSenderAddrInfo(scr: LEDDisplayInfo) {
  const ports = GetScreenPortAddrInfo(scr).filter(notEmptySender);
  return groupBySender(ports).map(([index, items]) =>
    makeStruct(ScreenPortAddrInfo, {
      ...index,
      LoadScannerCount: sumBy(items, 'LoadScannerCount'),
    })
  );
}
