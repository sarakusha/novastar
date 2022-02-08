/* eslint-disable unused-imports/no-unused-imports */
import { DeviceType, printBuffer, Request } from '@novastar/codec';
import AddressMapping from '@novastar/native/build/main/generated/AddressMapping';
import { TestModeEnum } from '@novastar/native/build/main/generated/TestMode';
import net, { findNetDevices } from '@novastar/net';
import serial, { findSendingCards } from '@novastar/serial';

import './api';
import ScreenConfigurator from './ScreenConfigurator';
import { SessionAPI } from './Session';

jest.setTimeout(20000);

describe('enumerator', () => {
  let session: SessionAPI;
  beforeAll(async () => {
    // const [address] = await findNetDevices();
    // if (address) {
    //   session = net.open(address);
    // }
    // console.log({ address });
    const [port] = await findSendingCards();
    if (port) {
      session = await serial.open(port.path);
    }
  });
  test('devices', async () => {
    if (session) {
      // session.connection.timeout = 5000;
      // const screenCfg = await session.ReadSender_ScreenConfigSpace(0);
      // console.log(printBuffer(screenCfg));

      const configurator = new ScreenConfigurator(session);
      await configurator.reload();
      const remarks = await session.ReadScanner_FPGAProgramRemarks(0, 0, 0);
      // const req = new Request(AddressMapping.CoefficientOccupancy);
      // req.address = AddressMapping.CoefficientAddr;
      // req.deviceType = DeviceType.ReceivingCard;
      // const res = await session.connection.send(req);
      // console.log(res.ack === 0, res.data.length, printBuffer(res.data));
      console.log({ remarks: remarks.toString().trim() });
      await configurator.WriteBrightness(50);
      await configurator.ReadBrightness();
      await configurator.ReadChipType(0);
      // await configurator.WriteDisplayMode(TestModeEnum.InclineLine_Mode);
      // await configurator.save();
      // const devices = await enumerateDevices(session);
      // // console.log({ devices });
      // // session.connection.timeout = 10000;
      // const data = await session.ReadSender_SoftwareSpace(
      //   0,
      //   54,
      //   SoftwareSpaceBaseAddress.BASE_ADDRESS
      // );
      // const header = data.slice(0, 4).toString('ascii');
      // // const d1 = await session.ReadSender_ScreenConfigSpace(0);
      // // console.log({ d1 });
      // const screen = new Screen(session);
      // await screen.read1();
    }
  });
  afterAll(() => session?.close());
});
