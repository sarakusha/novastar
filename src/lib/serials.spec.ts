import SerialPort from 'serialport';

import { Calibration, DeviceType, DisplayMode } from './Package';
import Session from './Session';
import serials from './serials';

import ProvidesCallback = jest.ProvidesCallback;

const itif = (name: string, condition: () => boolean | Promise<boolean>, fn: ProvidesCallback) => {
  it(name, async done => {
    if (await condition()) {
      fn(done);
    } else {
      console.warn(`[skipped]: ${name}`);
      done();
    }
  });
};
function asyncSerialMap<T, R>(
  items: readonly T[],
  action: (value: T, index: number) => Promise<R>
): Promise<R[]> {
  return items.reduce<Promise<R[]>>(
    (promise, value, index) => promise.then(async res => [...res, await action(value, index)]),
    Promise.resolve([])
  );
}

function toList<T>(enumeration: T): T[keyof T][] {
  return Object.keys(enumeration)
    .filter(k => typeof enumeration[k as keyof T] === 'number')
    .map(k => enumeration[k as keyof T]);
}

describe('serials', () => {
  let session: Session<SerialPort>;
  beforeAll(async done => {
    const [port] = await serials.findSendingCards();
    if (port) {
      session = await serials.open(port.path);
    } else {
      console.warn('Novastar device is not connected');
    }
    done();
  });
  itif(
    'get model sending card',
    () => session !== undefined,
    async done => {
      const model = await session.getModel(DeviceType.SendingCard);
      expect(model).toBe('MSD300/MCTRL300');
      done();
    }
  );
  itif(
    'get version sending card',
    () => session !== undefined,
    async done => {
      const version = await session.getSendingCardVersion();
      expect(version).toBe('4.7.2.0');
      done();
    }
  );
  itif(
    'MRV328 test',
    () => session !== undefined,
    async done => {
      const model = await session.getModel(DeviceType.ReceivingCard, 0, 0);
      expect(model).toBe('MRV328');
      done();
    }
  );
  itif(
    'brightness',
    () => session !== undefined,
    async done => {
      const brightness = Math.floor(Math.random() * 256);
      await session.setBrightness(brightness, 0xff);
      const value = await session.getBrightness(0);
      expect(value).toBe(brightness);
      done();
    }
  );
  itif(
    'redundant check',
    () => session !== undefined,
    async done => {
      const status = await session.checkRedundantStatus();
      expect(status).toEqual([false, false, false, false]);
      done();
    }
  );
  itif(
    'autobrightness mode',
    () => session !== undefined,
    async done => {
      const modes = [true, false];
      const res = await asyncSerialMap([true, false], async value => {
        await session.setAutobrightnessMode(value);
        return session.getAutobrightnessMode();
      });
      expect(res).toEqual(modes);
      done();
    }
  );
  itif(
    'display mode',
    () => session !== undefined,
    async done => {
      const modes = toList(DisplayMode).reverse();
      const res = await asyncSerialMap(modes, async value => {
        await session.setDisplayMode(value);
        return session.getDisplayMode();
      });
      expect(res).toEqual(modes);
      done();
    }
  );
  itif(
    'calibration mode',
    () => session !== undefined,
    async done => {
      const modes: [isOn: boolean, type: Calibration][] = [
        [true, Calibration.Brightness],
        [true, Calibration.Color],
        [false, Calibration.Color],
      ];
      const res = await asyncSerialMap(modes, async ([isOn, type]) => {
        await session.setCalibrationMode(isOn, type);
        const mode = await session.getCalibrationMode();
        return [mode.isOn, mode.type];
      });
      expect(res).toEqual(modes);
      done();
    }
  );
  afterAll(() => {
    session?.close();
  });
});
