import { randomUUID } from 'crypto';
import tls, { ConnectionOptions } from 'tls';

import { TaurusConnection } from './connection';

// cspell:ignore logined validition

export const TAURUS_MANAGEMENT_PORT = 16606;

export interface TaurusConnectOptions extends Omit<ConnectionOptions, 'host' | 'port'> {
  host: string;
  port?: number;
  timeout?: number;
  privacy?: boolean;
}

export interface TaurusLoginOptions {
  sn: string;
  password: string;
  username?: string;
  clientId?: string;
  clientName?: string;
}

export interface TaurusLoginResult {
  logined: boolean;
  validation?: boolean;
  validition?: boolean;
  username?: string;
  sn?: string;
}

export interface TaurusBrightness {
  brightness?: number;
  ratio?: number;
  solidity: boolean;
  orderId: number;
}

const numberOrUndefined = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isFinite(value) ? value : undefined;

export class TaurusClient {
  private constructor(public readonly connection: TaurusConnection) {}

  static async connect(options: TaurusConnectOptions): Promise<TaurusClient> {
    const {
      host,
      port = TAURUS_MANAGEMENT_PORT,
      timeout = 5000,
      privacy = true,
      ...tlsOptions
    } = options;
    if (!privacy) {
      const { connect } = await import('net');
      const socket = connect({ host, port });
      await new Promise<void>((resolve, reject) => {
        socket.once('connect', resolve);
        socket.once('error', reject);
      });
      return new TaurusClient(new TaurusConnection(socket, timeout));
    }

    const socket = tls.connect({
      host,
      port,
      rejectUnauthorized: false,
      ...tlsOptions,
    });
    await new Promise<void>((resolve, reject) => {
      socket.once('secureConnect', resolve);
      socket.once('error', reject);
    });
    return new TaurusClient(new TaurusConnection(socket, timeout));
  }

  async login(options: TaurusLoginOptions): Promise<TaurusLoginResult> {
    const response = await this.connection.requestJson<
      TaurusLoginResult & { token?: string; password?: string }
    >(
      { what: 0, type: 0, action: 0 },
      {
        sn: options.sn,
        username: options.username ?? 'admin',
        password: options.password,
        loginType: 0,
        source: { type: 1, platform: 2, platformVersion: '3.6.0' },
        clientId: options.clientId ?? randomUUID(),
        clientName: options.clientName ?? 'novastar.js',
      },
    );
    const { token: _token, password: _password, ...safeResponse } = response;
    return safeResponse;
  }

  async getBrightness(): Promise<TaurusBrightness> {
    const result = await this.connection.requestJson<Record<string, unknown>>({
      what: 0x18,
      type: 1,
      action: 5,
    });
    return {
      brightness: numberOrUndefined(result.brightness),
      ratio: numberOrUndefined(result.ratio),
      solidity: result.solidity === true,
      orderId: numberOrUndefined(result.orderId) ?? -1,
    };
  }

  async setBrightness(percent: number, persist = false): Promise<void> {
    if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
      throw new RangeError('Brightness must be between 0 and 100');
    }
    await this.connection.requestJson<unknown>(
      { what: 0x18, type: 1, action: 4 },
      { ratio: percent, solidity: persist, orderId: -1 },
    );
  }

  async getEnvironmentBrightness(): Promise<number> {
    const result = await this.connection.requestJson<{ value?: unknown }>({
      what: 0x1a,
      type: 0,
      action: 5,
    });
    const value = numberOrUndefined(result.value);
    if (value === undefined || value === -1000)
      throw new Error('Taurus ambient light sensor is unavailable');
    return value;
  }

  close(): void {
    this.connection.close();
  }
}
