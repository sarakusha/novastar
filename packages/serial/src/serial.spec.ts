import { Calibration, DeviceType, DisplayMode } from '@novastar/codec';

import serial, { SerialSession } from './serial';

import DoneCallback = jest.DoneCallback;

function itif<S>(name: string, condition: Promise<S>, fn: (s: S, done: DoneCallback) => any) {
  it(name, done => {
    condition.then(
      s => fn(s, done),
      () => {
        console.warn(`[skipped]: ${name}`);
        done();
      }
    );
  });
}

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
  const sessionPromise = new Promise<SerialSession>((resolve, reject) => {
    serial.findSendingCards().then(([port]) => {
      if (port) {
        resolve(serial.open(port.path));
      } else {
        reject(new Error('Novastar device is not connected'));
      }
    }, reject);
  });
  itif('get model sending card', sessionPromise, async (session, done) => {
    const model = await session.getModel(DeviceType.SendingCard);
    console.log({ model });
    expect(model).toBe('MSD/MCTRL 300');
    done();
  });
  itif('get version sending card', sessionPromise, async (session, done) => {
    const version = await session.getSendingCardVersion();
    expect(version).toBe('4.7.2.0');
    done();
  });
  itif('MRV328 test', sessionPromise, async (session, done) => {
    const model = await session.getModel(DeviceType.ReceivingCard, 0, 0);
    expect(model).toBe('MRV 328');
    done();
  });
  itif('brightness', sessionPromise, async (session, done) => {
    const brightness = Math.floor(Math.random() * 256);
    await session.setBrightness(brightness, 0);
    const value = await session.getBrightness(0);
    expect(value).toBe(brightness);
    done();
  });
  itif('redundant check', sessionPromise, async (session, done) => {
    const status = await session.checkRedundantStatus();
    expect(status).toEqual([false, false, false, false]);
    done();
  });
  itif('autobrightness mode', sessionPromise, async (session, done) => {
    const modes = [true, false];
    const res = await asyncSerialMap([true, false], async value => {
      await session.setAutobrightnessMode(value);
      return session.getAutobrightnessMode();
    });
    expect(res).toEqual(modes);
    done();
  });
  itif('display mode', sessionPromise, async (session, done) => {
    const modes = toList(DisplayMode).reverse();
    const res = await asyncSerialMap(modes, async value => {
      await session.setDisplayMode(value);
      return session.getDisplayMode();
    });
    expect(res).toEqual(modes);
    done();
  });
  itif('calibration mode', sessionPromise, async (session, done) => {
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
  });
  afterAll(() => {
    sessionPromise.then(
      session => session.close(),
      () => {}
    );
  });
});
