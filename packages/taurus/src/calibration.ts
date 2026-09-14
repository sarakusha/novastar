import { createConnection, type Socket } from 'node:net';
import { setTimeout as sleep } from 'node:timers/promises';

import {
  Connection,
  DeviceType,
  ErrorType,
  Request,
  ResponseError,
  TimeoutError,
} from '@novastar/codec';

import type {
  TaurusCalibrationInspection,
  TaurusCalibrationModule,
  TaurusCalibrationProgress,
  TaurusCalibrationTarget,
} from './calibrationTypes';

// NovaLCT: CoefficientOperateController, FlashCheckAccessor and
// PollingScannerRegisterAccessor. TCP/5200 forwards receiving-card registers
// only while the same host has an authenticated Taurus management session.
export const CALIBRATION_REGISTER = {
  checkModules: 0x01000074,
  loadFromModules: 0x01000007,
  saveToReceivingCard: 0x01000004,
  ready: 0x02000200,
  topology: 0x03002000,
  moduleResults: 0x03003010,
} as const;

export interface CalibrationTransport {
  read(target: TaurusCalibrationTarget, address: number, length: number): Promise<Buffer>;
  write(target: TaurusCalibrationTarget, address: number, data: Buffer): Promise<void>;
}

const label = ({ port, receivingCard }: TaurusCalibrationTarget): string =>
  `Port ${port + 1}, receiving card ${receivingCard + 1}`;

export const validateCalibrationTargets = (
  targets: TaurusCalibrationTarget[],
  available: TaurusCalibrationTarget[],
): TaurusCalibrationTarget[] => {
  if (!Array.isArray(targets) || !targets.length)
    throw new Error('Select at least one receiving card');
  const unique = new Map<string, TaurusCalibrationTarget>();
  targets.forEach((target) => {
    if (
      !target ||
      !Number.isInteger(target.port) ||
      target.port < 0 ||
      target.port >= 255 ||
      !Number.isInteger(target.receivingCard) ||
      target.receivingCard < 0 ||
      target.receivingCard >= 65535 ||
      !available.some(
        (item) => item.port === target.port && item.receivingCard === target.receivingCard,
      )
    ) {
      throw new Error('Receiving card is not in the current Taurus configuration');
    }
    unique.set(`${target.port}:${target.receivingCard}`, {
      port: target.port,
      receivingCard: target.receivingCard,
    });
  });
  return [...unique.values()];
};

export const openCalibrationTransport = async (
  host: string,
): Promise<CalibrationTransport & { close(): void }> => {
  // A private connection avoids registering a duplicate player in the legacy
  // discovery binding or closing another operation's cached net session.
  const socket = createConnection({ host, port: 5200 });
  try {
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(
        () => reject(new Error('Taurus TCP/5200 connection timed out')),
        5000,
      );
      const done = (error?: Error) => {
        clearTimeout(timer);
        socket.off('error', done);
        if (error) reject(error);
        else resolve();
      };
      socket.once('error', done);
      socket.once('connect', () => done());
    });
  } catch (error) {
    socket.destroy();
    throw error;
  }
  const connection = new Connection<Socket>(socket, { timeout: 3000 });
  const send = async (target: TaurusCalibrationTarget, address: number, value: number | Buffer) => {
    if (socket.destroyed) throw new Error('Taurus TCP/5200 connection closed');
    const request = typeof value === 'number' ? new Request(value) : new Request(value);
    request.deviceType = DeviceType.ReceivingCard;
    request.port = target.port;
    request.rcvIndex = target.receivingCard;
    request.address = address;
    const response = await connection.send(request);
    if (response.ack !== ErrorType.Succeeded)
      throw new Error(`${label(target)}: register error ${response.ack}`);
    if (typeof value === 'number' && response.data.length !== value) {
      throw new Error(`${label(target)}: incomplete register response`);
    }
    return response.data;
  };
  return {
    read: send,
    write: async (target, address, data) => {
      await send(target, address, data);
    },
    close: () => {
      connection.close();
      socket.destroy();
    },
  };
};

export const waitForCalibrationReady = async (
  transport: CalibrationTransport,
  target: TaurusCalibrationTarget,
  timeout = 480_000,
): Promise<void> => {
  const deadline = Date.now() + timeout;
  let lastError: unknown;
  // NovaLCT waits for a successful read of the complete 256-byte register
  // block. Its contents are not a progress percentage or a zero/busy flag.
  do {
    await sleep(500);
    try {
      const data = await transport.read(target, CALIBRATION_REGISTER.ready, 256);
      if (data.length !== 256) throw new Error('Incomplete receiving-card readiness response');
      return;
    } catch (error) {
      if (
        !(error instanceof TimeoutError) &&
        !(error instanceof ResponseError && error.res.ack === ErrorType.Timeout)
      )
        throw error;
      lastError = error;
    }
  } while (Date.now() < deadline);
  throw new Error(
    `${label(target)}: timed out waiting for receiving-card readiness (${String(lastError)})`,
  );
};

export const parseCalibrationModules = (
  topology: Buffer,
  results: Buffer,
): TaurusCalibrationModule[] => {
  if (topology.length < 16 || topology[0] !== 2 || topology[1] !== 5) {
    throw new Error('Receiving card returned an unsupported module flash topology');
  }
  const count = topology[2] * topology[3];
  if (!count || count > 256 || topology.length < (count + 1) * 16 || results.length !== count * 4) {
    throw new Error('Invalid module topology or inspection result length');
  }
  return Array.from({ length: count }, (_, index) => {
    const offset = (index + 1) * 16;
    const status = results[index * 4];
    if (status !== 3 && status !== 5) {
      throw new Error(`Module ${index + 1}: flash check failed (status ${status})`);
    }
    const width = topology.readUInt16LE(offset + 9);
    const height = topology.readUInt16LE(offset + 11);
    if (status === 5 && (topology[offset] !== 5 || !width || !height)) {
      throw new Error(`Module ${index + 1}: invalid flash geometry`);
    }
    return {
      index,
      x: topology.readUInt16LE(offset + 5),
      y: topology.readUInt16LE(offset + 7),
      width,
      height,
      present: status === 5,
    };
  });
};

export const inspectCalibrationModules = async (
  transport: CalibrationTransport,
  target: TaurusCalibrationTarget,
): Promise<TaurusCalibrationInspection> => {
  await waitForCalibrationReady(transport, target, 10_000);
  // 4 checks module flash hardware; it does not save coefficients to modules.
  await transport.write(target, CALIBRATION_REGISTER.checkModules, Buffer.from([4]));
  await waitForCalibrationReady(transport, target);
  const header = await transport.read(target, CALIBRATION_REGISTER.topology, 16);
  const count = header[2] * header[3];
  if (header[0] !== 2 || header[1] !== 5 || !count || count > 256) {
    throw new Error(`${label(target)}: unsupported module flash topology`);
  }
  const topology = await transport.read(target, CALIBRATION_REGISTER.topology, (count + 1) * 16);
  const results = await transport.read(target, CALIBRATION_REGISTER.moduleResults, count * 4);
  return { ...target, modules: parseCalibrationModules(topology, results) };
};

export const loadCalibrationFromModules = async (
  transport: CalibrationTransport,
  targets: TaurusCalibrationTarget[],
  allowPartial: boolean,
  onProgress: (progress: TaurusCalibrationProgress) => void,
) => {
  const cards: TaurusCalibrationInspection[] = [];
  let completed = 0;
  const progress = (target: TaurusCalibrationTarget, stage: TaurusCalibrationProgress['stage']) =>
    onProgress({ completed, total: targets.length, target, stage });
  try {
    // Check every destination before replacing any receiving-card coefficients.
    for (const target of targets) {
      progress(target, 'checking');
      const card = await inspectCalibrationModules(transport, target);
      const present = card.modules.filter((module) => module.present).length;
      if (!present) throw new Error(`${label(target)}: no module flash found`);
      if (!allowPartial && present !== card.modules.length) {
        throw new Error(
          `${label(target)}: found ${present}/${card.modules.length} modules; allowPartial is required for missing modules`,
        );
      }
      cards.push(card);
    }
    for (const card of cards) {
      progress(card, 'loading');
      // Normal calibration coefficients: module IIC flash -> receiving-card RAM.
      await transport.write(card, CALIBRATION_REGISTER.loadFromModules, Buffer.from([0]));
      await waitForCalibrationReady(transport, card);
      progress(card, 'saving');
      // RAM -> receiving-card SPI flash. Never write back to module flash.
      await transport.write(card, CALIBRATION_REGISTER.saveToReceivingCard, Buffer.from([0]));
      await waitForCalibrationReady(transport, card);
      completed += 1;
    }
    return { completed, total: targets.length, cards };
  } catch (error) {
    throw new Error(
      `Calibration: saved ${completed}/${targets.length} receiving cards. ${error instanceof Error ? error.message : String(error)}`,
      { cause: error },
    );
  }
};
