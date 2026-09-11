import { delay, DeviceType, Request } from '@novastar/codec';

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
  onProgress?: (progress: NcpSendProgress) => void;
}

const scannerBusyAddress = 0x0200_0001;

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
    // NovaLCT treats any successful reply to this register as an idle card.
    // eslint-disable-next-line no-await-in-loop
    const response = await session.connection.trySend(request);
    if (response) return;
    if (Date.now() >= deadline) throw new Error('Receiving card did not become ready');
    // eslint-disable-next-line no-await-in-loop
    await delay(200);
  }
};

/**
 * Send one decoded NCP cabinet configuration to one explicitly addressed receiving card.
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
  const { parameters } = cabinet;
  for (let index = 0; index < parameters.length; index += 1) {
    const parameter = parameters[index];
    const request = new Request(parameter.data, parameter.name ?? 'NCP');
    request.address = parameter.address;
    request.deviceType = DeviceType.ReceivingCard;
    request.destination = target.sender;
    request.port = target.port;
    request.rcvIndex = target.receivingCard;
    // eslint-disable-next-line no-await-in-loop
    await session.connection.send(request);
    if (parameter.pollingTime > 0) {
      // eslint-disable-next-line no-await-in-loop
      await waitForReceivingCard(session, target, parameter.pollingTime);
      // eslint-disable-next-line no-await-in-loop
      if (parameter.pollingWaitTime > 0) await delay(parameter.pollingWaitTime);
    }
    options.onProgress?.({
      completed: index + 1,
      total: parameters.length,
      address: parameter.address,
      name: parameter.name,
    });
    // eslint-disable-next-line no-await-in-loop
    if (parameter.delay > 0) await delay(parameter.delay);
  }
};
