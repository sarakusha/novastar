import * as calibration from './calibration';
import { TaurusClient } from './client';
import type { TaurusCalibrationResult } from './calibrationTypes';

// cspell:ignore logined

const target = { port: 0, receivingCard: 0 };
const result: TaurusCalibrationResult = {
  completed: 1,
  total: 1,
  cards: [{ ...target, modules: [] }],
};
const createClient = () => {
  const requestJson = jest.fn().mockResolvedValue({ logined: true });
  const client = Reflect.construct(TaurusClient, [
    { requestJson, closed: false },
    'test-host',
  ]) as TaurusClient;
  jest.spyOn(client, 'getLedScreenConfiguration').mockResolvedValue({
    screens: [
      {
        id: 0,
        source: 1,
        type: 2,
        columns: 1,
        rows: 1,
        offset: { x: 0, y: 0 },
        portNumber: 1,
        portOrder: [0],
        size: { width: 108, height: 192 },
        receivingCards: [
          { port: 0, connection: 0, x: 0, y: 0, xInPort: 0, yInPort: 0, width: 108, height: 192 },
        ],
      },
    ],
  });
  jest.spyOn(client, 'getReceivingCardVersions').mockResolvedValue([{ ...target, modelId: 18434 }]);
  jest.spyOn(client, 'getBrightness').mockResolvedValue({ ratio: 0, solidity: false, orderId: 0 });
  return client;
};
const transport = () => ({ read: jest.fn(), write: jest.fn(), close: jest.fn() });
afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});

describe('TaurusClient module calibration', () => {
  test('requires an authenticated management connection', async () => {
    const client = createClient();
    const open = jest.spyOn(calibration, 'openCalibrationTransport');
    await expect(client.inspectReceivingCardCalibration([target])).rejects.toThrow(
      /authentication/,
    );
    expect(open).not.toHaveBeenCalled();
  });

  test('inspects via a private transport and closes it', async () => {
    const client = createClient();
    await client.login({ sn: 'test', password: 'test' });
    const io = transport();
    jest.spyOn(calibration, 'openCalibrationTransport').mockResolvedValue(io);
    jest.spyOn(calibration, 'inspectCalibrationModules').mockResolvedValue(result.cards[0]);
    const progress = jest.fn();
    await expect(
      client.inspectReceivingCardCalibration([target], { onProgress: progress }),
    ).resolves.toEqual({ ...result, completed: 0 });
    expect(calibration.openCalibrationTransport).toHaveBeenCalledWith('test-host');
    expect(io.close).toHaveBeenCalledTimes(1);
    expect(progress).toHaveBeenCalledWith({ completed: 0, total: 1, target, stage: 'checking' });
  });

  test('maintains the session, rejects concurrent calibration, and releases the lock on failure', async () => {
    jest.useFakeTimers();
    const client = createClient();
    await client.login({ sn: 'test', password: 'test' });
    const io = transport();
    jest.spyOn(calibration, 'openCalibrationTransport').mockResolvedValue(io);
    const load = jest
      .spyOn(calibration, 'loadCalibrationFromModules')
      .mockImplementation(async () => {
        await new Promise((resolve) => setTimeout(resolve, 6000));
        throw new Error('save failed');
      });
    const failed = expect(client.loadReceivingCardCalibration([target])).rejects.toThrow(
      /save failed/,
    );
    await expect(client.loadReceivingCardCalibration([target])).rejects.toThrow(/already running/);
    await jest.advanceTimersByTimeAsync(6000);
    await failed;
    expect(client.getBrightness).toHaveBeenCalledTimes(1);
    expect(io.close).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(0);
    load.mockResolvedValue(result);
    await expect(
      client.loadReceivingCardCalibration([target], { allowPartial: true }),
    ).resolves.toEqual(result);
    expect(load).toHaveBeenLastCalledWith(io, [target], true, expect.any(Function));
  });
});
