/* eslint-disable no-await-in-loop */
import { decodeUIntLE, Request, TimeoutError } from '@novastar/codec';
import { HDEnableModeEnum } from '@novastar/native/HDEnableMode';
import { NSCardTypeEnum } from '@novastar/native/NSCardType';
import { VedioSelectModeEnum } from '@novastar/native/VedioSelectMode';

import { GetPortNumber } from './CustomTransform';
import { DeviceInfo } from './DeviceInfo';
import GetDeviceTypeLanguage from './GetDeviceTypeLanguage';
import { SessionAPI } from './Session';

/**
 * ControllerProcessor:637
 * @param session
 * @param index
 */
async function readMaxPackageSize(session: SessionAPI, index: number): Promise<number> {
  const req = new Request(1);
  req.address = 6;
  req.destination = index;
  const res = await session.connection.trySend(req);
  if (res && res.data[0] === 0xa8) {
    const req1 = new Request(2);
    req1.address = 7;
    const res1 = await session.connection.trySend(req1);
    if (res1) return decodeUIntLE(res1);
  }
  return 256;
}

async function readDeviceInfo(session: SessionAPI, index: number): Promise<DeviceInfo | null> {
  try {
    const deviceInfo: DeviceInfo = {
      model: await session.ReadControllerModelId(index),
      mac: [...(await session.ReadControllerSnHigh(index))]
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join(':'),
      maxPackageSize: await readMaxPackageSize(session, index),
      companyId: await session.ReadCompanyID(index),
      audioControl: await session.ReadAudioControl(index),
      dviSelect: await session.ReadDviSelect(index),
      hdEnable: (await session.ReadHDEnable(index)) || HDEnableModeEnum.Bit8,
      videoSelect:
        (await session.ReadDviMode(index)) === 90
          ? VedioSelectModeEnum.Manual
          : VedioSelectModeEnum.Auto,
      fieldRate: 60,
      portCount: 2,
    };

    /**
     * ControllerProcessor:604
     */
    if (deviceInfo.model !== NSCardTypeEnum.FunctionCard) {
      const req = new Request(88);
      req.address = 0x1400_0000;
      const res = await session.connection.trySend(req);
      if (res && res.ack === 0 && res.data[0] === 0xa8) {
        const len = res.data[17];
        deviceInfo.name = res.data.slice(18, 18 + len).toString();
      }
    }
    if (!deviceInfo.name) deviceInfo.name = GetDeviceTypeLanguage(deviceInfo.model);
    deviceInfo.portCount = GetPortNumber(deviceInfo.model);
    return deviceInfo;
  } catch (e) {
    if (!(e instanceof TimeoutError)) throw e;
    return null;
  }
}

/**
 * Nova.LCT.Message.Server.ControllerProcessor
 * ControllerProcessor::FindEquipment
 * @param session
 */
export default async function enumerateDevices(session: SessionAPI): Promise<DeviceInfo[]> {
  const devices: DeviceInfo[] = [];
  const destination = 255;
  await session.SetSortOrder(destination, true, 0);
  for (let i = 0; ; i += 1) {
    const info = await readDeviceInfo(session, i);
    if (!info) break;
    devices.push(info);
  }
  return devices;
}
