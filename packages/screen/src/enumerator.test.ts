import { inspect } from 'util';

import { findNetDevices, net } from '@novastar/net';

import './api';
import ScreenConfigurator from './ScreenConfigurator';
import { SessionAPI } from './Session';

jest.setTimeout(50000);

const delay = (ms: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

describe('enumerator', () => {
  let session: SessionAPI;
  beforeAll(async () => {
    const [address] = await findNetDevices();
    if (address) {
      session = net.open(address);
    }
    console.log({ address });
    // const [port] = await findSendingCards();
    // if (port) {
    //   session = await serial.open({ path: port.path, baudRate: 115200 });
    // }
  });
  test('devices', async () => {
    if (session) {
      // session.connection.timeout = 5000;
      // const screenCfg = await session.ReadSender_ScreenConfigSpace(0);
      // console.log(printBuffer(screenCfg));

      const configurator = new ScreenConfigurator(session);
      await configurator.reload();
      // const data = Buffer.from([0, 0, 0, 0, 85, 170, 1, 2, 128, 255, 129]);
      //
      // const req = new Request(data);
      // req.address = AddressMapping.FuncCard_WriteOutDeviceAddr;
      // req.deviceType = DeviceType.FunctionCard;
      // await session.connection.send(req);
      // await delay(1000);
      // const val = await session.FuncCard_ReadOutDeviceValue_1(0,0,0);
      // const val = await configurator.ReadFirstFuncCardLightSensor();
      // console.log({ val });
      // await configurator.WriteBrightness(0.1);
      // await configurator.WriteDisplayMode(TestModeEnum.InclineLine_Mode);
      // console.log({ brightness: await configurator.ReadFirstBrightness() });
      for await (const status of configurator.ReadHWStatus()) {
        console.log(inspect(status, false, null));
      }
      await delay(35000);
      await configurator.reload();
      // const remarks = await session.ReadScanner_FPGAProgramRemarks(0, 0, 0);
      // const req = new Request(AddressMapping.CoefficientOccupancy);
      // req.address = AddressMapping.CoefficientAddr;
      // req.deviceType = DeviceType.ReceivingCard;
      // const res = await session.connection.send(req);
      // console.log(res.ack === 0, res.data.length, printBuffer(res.data));
      // console.log({ remarks: remarks.toString().trim() });
      // await configurator.WriteBrightness(50);
      // await configurator.ReadBrightness();
      // await configurator.ReadChipType(0);
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
  // test('test', () => {
  //   enum Test {
  //     a,
  //     b,
  //     c,
  //   }
  //   console.log(Object.values(Test));
  // });
  afterAll(() => session?.close());
});
