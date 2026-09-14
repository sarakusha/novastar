import { ErrorType, Request, ResponseError } from '@novastar/codec';

import {
  CALIBRATION_REGISTER as register,
  loadCalibrationFromModules,
  parseCalibrationModules,
  validateCalibrationTargets,
  waitForCalibrationReady,
  type CalibrationTransport,
} from './calibration';

const target = { port: 0, receivingCard: 0 };
jest.mock('node:timers/promises', () => ({
  setTimeout: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),
}));
const topology = () => {
  const data = Buffer.alloc(48);
  data.set([2, 5, 1, 2]);
  for (const offset of [16, 32]) {
    data[offset] = 5;
    data.writeUInt16LE(108, offset + 9);
    data.writeUInt16LE(192, offset + 11);
  }
  data.writeUInt16LE(108, 37);
  return data;
};

const makeTransport = (statuses = [5, 5]) => {
  const results = Buffer.alloc(8);
  statuses.forEach((status, i) => {
    results[i * 4] = status;
  });
  return {
    read: jest.fn<
      ReturnType<CalibrationTransport['read']>,
      Parameters<CalibrationTransport['read']>
    >(async (_target, address, length) => {
      if (address === register.ready) return Buffer.alloc(256, 0xab);
      if (address === register.topology) return topology().subarray(0, length);
      if (address === register.moduleResults) return results;
      throw new Error('Unexpected read');
    }),
    write: jest.fn<
      ReturnType<CalibrationTransport['write']>,
      Parameters<CalibrationTransport['write']>
    >(async () => undefined),
  };
};

afterEach(() => jest.useRealTimers());

describe('Taurus module calibration', () => {
  it('validates targets, removes duplicates and forbids broadcast and unknown cards', () => {
    expect(validateCalibrationTargets([target, target], [target])).toEqual([target]);
    for (const invalid of [
      [],
      [{ port: 0, receivingCard: 65535 }],
      [{ port: -1, receivingCard: 0 }],
      [{ port: 0.5, receivingCard: 0 }],
      [{ port: 1, receivingCard: 0 }],
      [null],
    ]) {
      expect(() => validateCalibrationTargets(invalid as (typeof target)[], [target])).toThrow();
    }
  });

  it('reports present and absent modules in logical topology order', () => {
    expect(parseCalibrationModules(topology(), Buffer.from([3, 5, 0, 0, 5, 5, 0, 0]))).toEqual([
      { index: 0, x: 0, y: 0, width: 108, height: 192, present: false },
      { index: 1, x: 108, y: 0, width: 108, height: 192, present: true },
    ]);
  });

  it('rejects missing topology, malformed results and flash errors', () => {
    expect(() => parseCalibrationModules(Buffer.alloc(16), Buffer.alloc(8))).toThrow();
    expect(() => parseCalibrationModules(topology(), Buffer.alloc(7))).toThrow();
    expect(() =>
      parseCalibrationModules(topology(), Buffer.from([255, 0, 0, 0, 5, 5, 0, 0])),
    ).toThrow(/255/);
  });

  it('loads from module flash and only then saves to receiving-card flash', async () => {
    jest.useFakeTimers();
    const transport = makeTransport();
    const progress = jest.fn();
    const promise = loadCalibrationFromModules(transport, [target], false, progress);
    await jest.runAllTimersAsync();
    expect(await promise).toMatchObject({ completed: 1, total: 1 });
    expect(transport.write.mock.calls.map(([, address, data]) => [address, [...data]])).toEqual([
      [register.checkModules, [4]],
      [register.loadFromModules, [0]],
      [register.saveToReceivingCard, [0]],
    ]);
    expect(progress.mock.calls.map(([p]) => p.stage)).toEqual(['checking', 'loading', 'saving']);
  });

  it('checks all cards before loading, and blocks an empty or unconfirmed partial set', async () => {
    jest.useFakeTimers();
    for (const statuses of [
      [3, 3],
      [3, 5],
    ]) {
      const transport = makeTransport(statuses);
      const promise = expect(
        loadCalibrationFromModules(transport, [target], false, jest.fn()),
      ).rejects.toThrow();
      await jest.runAllTimersAsync();
      await promise;
      expect(transport.write.mock.calls.map(([, address]) => address)).toEqual([
        register.checkModules,
      ]);
    }
    const transport = makeTransport([3, 5]);
    const promise = loadCalibrationFromModules(transport, [target], true, jest.fn());
    await jest.runAllTimersAsync();
    expect(await promise).toMatchObject({ completed: 1 });
  });

  it('never saves when loading fails', async () => {
    jest.useFakeTimers();
    const transport = makeTransport();
    transport.write.mockImplementation(async (_target, address) => {
      if (address === register.loadFromModules) throw new Error('Load failed');
    });
    const promise = expect(
      loadCalibrationFromModules(transport, [target], false, jest.fn()),
    ).rejects.toThrow(/0\/1.*Load failed/);
    await jest.runAllTimersAsync();
    await promise;
    expect(
      transport.write.mock.calls.some(([, address]) => address === register.saveToReceivingCard),
    ).toBe(false);
  });

  it('does not load the first card when preflight fails on the second', async () => {
    jest.useFakeTimers();
    const transport = makeTransport();
    const read = transport.read.getMockImplementation()!;
    transport.read.mockImplementation(async (card, address, length) => {
      if (card.receivingCard === 1 && address === register.moduleResults) {
        return Buffer.from([3, 5, 0, 0, 3, 5, 0, 0]);
      }
      return read(card, address, length);
    });
    const promise = expect(
      loadCalibrationFromModules(
        transport,
        [target, { port: 0, receivingCard: 1 }],
        false,
        jest.fn(),
      ),
    ).rejects.toThrow(/0\/2/);
    await jest.runAllTimersAsync();
    await promise;
    expect(
      transport.write.mock.calls.every(([, address]) => address === register.checkModules),
    ).toBe(true);
  });

  it('reports completed cards accurately if persistence fails partway through', async () => {
    jest.useFakeTimers();
    const transport = makeTransport();
    transport.write.mockImplementation(async (card, address) => {
      if (card.receivingCard === 1 && address === register.saveToReceivingCard)
        throw new Error('Save failed');
    });
    const promise = expect(
      loadCalibrationFromModules(
        transport,
        [target, { port: 0, receivingCard: 1 }],
        false,
        jest.fn(),
      ),
    ).rejects.toThrow(/1\/2.*Save failed/);
    await jest.runAllTimersAsync();
    await promise;
  });

  it('retries busy responses but never interprets arbitrary nonzero data as busy', async () => {
    jest.useFakeTimers();
    const transport = makeTransport();
    const response = new Request(256);
    response.ack = ErrorType.Timeout;
    transport.read.mockRejectedValueOnce(new ResponseError(response));
    const promise = waitForCalibrationReady(transport, target, 1500);
    await jest.runAllTimersAsync();
    await promise;
    expect(transport.read).toHaveBeenCalledTimes(2);
  });

  it('fails immediately on disconnect and bounds busy polling', async () => {
    jest.useFakeTimers();
    const transport = makeTransport();
    transport.read.mockRejectedValue(new Error('Connection closed'));
    let promise = expect(waitForCalibrationReady(transport, target)).rejects.toThrow(/closed/);
    await jest.runAllTimersAsync();
    await promise;
    const response = new Request(256);
    response.ack = ErrorType.Timeout;
    transport.read.mockRejectedValue(new ResponseError(response));
    promise = expect(waitForCalibrationReady(transport, target, 1000)).rejects.toThrow(/readiness/);
    await jest.runAllTimersAsync();
    await promise;
  });
});
