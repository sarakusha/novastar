import { ErrorType } from '@novastar/codec';

import type { NcpCabinetConfig } from './NcpConfig';
import { sendNcpCabinetConfig } from './NcpSender';
import type { SessionAPI } from './Session';

describe('sendNcpCabinetConfig', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('follows NovaLCT delay and readiness polling semantics', async () => {
    jest.useFakeTimers();
    const send = jest.fn().mockResolvedValue(undefined);
    const trySend = jest
      .fn()
      .mockResolvedValueOnce({ ack: ErrorType.Timeout })
      .mockResolvedValueOnce({ ack: ErrorType.Succeeded })
      .mockResolvedValueOnce({ ack: ErrorType.Succeeded });
    const session = { connection: { send, trySend, maxLength: 512 } } as unknown as SessionAPI;
    const cabinet = {
      parameters: [
        {
          address: 0x0100_00a8,
          data: Buffer.from([1]),
          delay: 100,
          pollingTime: 2000,
          pollingWaitTime: 0x8064,
        },
      ],
    } as NcpCabinetConfig;

    const sending = sendNcpCabinetConfig(
      session,
      cabinet,
      { sender: 0, port: 0, receivingCard: 0 },
      {
        allReceivingCards: true,
        readinessTargets: [
          { sender: 0, port: 0, receivingCard: 0 },
          { sender: 0, port: 1, receivingCard: 0 },
        ],
      },
    );
    await jest.advanceTimersByTimeAsync(99);
    expect(send.mock.calls[0]?.[0]).toMatchObject({
      destination: 0xff,
      port: 0xff,
      rcvIndex: 0xffff,
    });
    expect(trySend).not.toHaveBeenCalled();
    await jest.advanceTimersByTimeAsync(1);
    expect(trySend).toHaveBeenCalledTimes(1);
    await jest.advanceTimersByTimeAsync(199);
    expect(trySend).toHaveBeenCalledTimes(1);
    await jest.advanceTimersByTimeAsync(1);
    expect(trySend).toHaveBeenCalledTimes(3);
    expect(trySend.mock.calls[2]?.[0]).toMatchObject({ port: 1, rcvIndex: 0 });
    await jest.advanceTimersByTimeAsync(1099);
    let completed = false;
    void sending.then(() => {
      completed = true;
    });
    await jest.advanceTimersByTimeAsync(1);
    await sending;
    expect(completed).toBe(true);
  });

  it('reports progress for each transport chunk', async () => {
    const send = jest.fn().mockResolvedValue(undefined);
    const onProgress = jest.fn();
    const session = {
      connection: { send, trySend: jest.fn(), maxLength: 512 },
    } as unknown as SessionAPI;
    const cabinet = {
      parameters: [
        {
          address: 0x0300_0000,
          data: Buffer.alloc(1025),
          delay: 0,
          pollingTime: 0,
          pollingWaitTime: 0,
        },
      ],
    } as NcpCabinetConfig;

    await sendNcpCabinetConfig(
      session,
      cabinet,
      { sender: 0, port: 0, receivingCard: 0 },
      {
        onProgress,
      },
    );

    expect(send).toHaveBeenCalledTimes(3);
    expect(onProgress.mock.calls.map(([progress]) => progress.completedBytes)).toEqual([
      512, 1024, 1025,
    ]);
    expect(onProgress.mock.lastCall?.[0]).toMatchObject({
      completed: 1,
      total: 1,
      totalBytes: 1025,
    });
  });
});
