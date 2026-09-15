import { delay, DeviceType, ErrorType, Request, ResponseError } from '@novastar/codec';

import type { NcpCabinetConfig } from './NcpConfig';
import type { SessionAPI } from './Session';

export interface NcpTarget {
  sender: number;
  port: number;
  receivingCard: number;
}

export interface NcpSendProgress {
  completed: number;
  total: number;
  address: number;
  name?: string;
}

export interface NcpSendOptions {
  allReceivingCards?: boolean;
  readinessTargets?: readonly NcpTarget[];
  onProgress?: (progress: NcpSendProgress) => void;
}

const scannerBusyAddress = 0x0200_0001;
const pollingRetryDelay = 200;
const pollingWaitFlag = 0x8000;
const pollingCompletionDelay = 1000;

const assertUInt = (name: string, value: number, max: number): void => {
  if (!Number.isInteger(value) || value < 0 || value > max) {
    throw new RangeError(`Invalid ${name}: ${value}`);
  }
};

const waitForReceivingCard = async (
  session: SessionAPI,
  target: NcpTarget,
  timeout: number,
): Promise<void> => {
  const deadline = Date.now() + timeout + 10_000;
  while (true) {
    const request = new Request(16, 'NCP:poll');
    request.address = scannerBusyAddress;
    request.deviceType = DeviceType.ReceivingCard;
    request.destination = target.sender;
    request.port = target.port;
    request.rcvIndex = target.receivingCard;
    request.timeout = 5_000;
    // NovaLCT treats an ACK=0 reply as an idle card and ACK=1 as still busy.
    // eslint-disable-next-line no-await-in-loop
    const response = await session.connection.trySend(request);
    if (response?.ack === ErrorType.Succeeded) return;
    if (response && response.ack !== ErrorType.Timeout) {
      throw new ResponseError(response, request.tag);
    }
    if (Date.now() >= deadline) throw new Error('Receiving card did not become ready');
    // eslint-disable-next-line no-await-in-loop
    await delay(pollingRetryDelay);
  }
};

const getPollingCompletionDelay = (encodedDelay: number): number =>
  pollingCompletionDelay + (encodedDelay & (pollingWaitFlag - 1));

/**
 * Send one decoded NCP cabinet configuration. The target is used for addressed writes and as the
 * default readiness-polling address; `allReceivingCards` switches parameter writes to broadcast.
 * Firmware and multi-mode files embedded in the NCP are intentionally not flashed.
 */
export const sendNcpCabinetConfig = async (
  session: SessionAPI,
  cabinet: NcpCabinetConfig,
  target: NcpTarget,
  options: NcpSendOptions = {},
): Promise<void> => {
  assertUInt('sender', target.sender, 0xfe);
  assertUInt('port', target.port, 0xfe);
  assertUInt('receivingCard', target.receivingCard, 0xfffe);
  const readinessTargets = options.readinessTargets ?? [target];
  readinessTargets.forEach((readinessTarget) => {
    assertUInt('sender', readinessTarget.sender, 0xfe);
    assertUInt('port', readinessTarget.port, 0xfe);
    assertUInt('receivingCard', readinessTarget.receivingCard, 0xfffe);
  });
  const { parameters } = cabinet;
  for (let index = 0; index < parameters.length; index += 1) {
    const parameter = parameters[index];
    const request = new Request(parameter.data, parameter.name ?? 'NCP');
    request.address = parameter.address;
    request.deviceType = DeviceType.ReceivingCard;
    request.destination = options.allReceivingCards ? 0xff : target.sender;
    request.port = options.allReceivingCards ? 0xff : target.port;
    request.rcvIndex = options.allReceivingCards ? 0xffff : target.receivingCard;
    // eslint-disable-next-line no-await-in-loop
    await session.connection.send(request);
    // NovaLCT waits before polling. Some commands need several seconds before
    // the receiving card starts responding to readiness requests.
    // eslint-disable-next-line no-await-in-loop
    if (parameter.delay > 0) await delay(parameter.delay);
    if (parameter.pollingTime > 0) {
      for (const readinessTarget of readinessTargets) {
        // eslint-disable-next-line no-await-in-loop
        await waitForReceivingCard(session, readinessTarget, parameter.pollingTime);
      }
      // eslint-disable-next-line no-await-in-loop
      await delay(getPollingCompletionDelay(parameter.pollingWaitTime));
    }
    options.onProgress?.({
      completed: index + 1,
      total: parameters.length,
      address: parameter.address,
      name: parameter.name,
    });
  }
};
