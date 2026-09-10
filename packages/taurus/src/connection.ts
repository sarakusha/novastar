import { Duplex } from 'stream';

import {
  decodeTaurusPacket,
  encodeTaurusRequest,
  getTaurusPacketSize,
  TAURUS_HEADER_SIZE,
  TAURUS_RESPONSE,
  TaurusCommand,
  TaurusPacket,
} from './packet';

type PendingRequest = {
  resolve: (packet: TaurusPacket) => void;
  reject: (error: Error) => void;
  timer: NodeJS.Timeout;
};

export class TaurusResponseError extends Error {
  constructor(
    public readonly status: number,
    public readonly responseBody: string,
  ) {
    super(
      `Taurus request failed with status 0x${status.toString(16)}${responseBody ? `: ${responseBody}` : ''}`,
    );
    this.name = 'TaurusResponseError';
  }
}

export class TaurusConnection {
  readonly #pending = new Map<number, PendingRequest>();
  #buffer = Buffer.alloc(0);
  #sequence = 0;
  #closed = false;

  constructor(
    public readonly stream: Duplex,
    public readonly timeout = 5000,
  ) {
    stream.on('data', (chunk: Buffer | string) => this.#onData(Buffer.from(chunk)));
    stream.once('close', () => this.#close(new Error('Taurus connection closed')));
    stream.once('error', (error: Error) => this.#close(error));
  }

  get closed(): boolean {
    return this.#closed;
  }

  request(command: TaurusCommand, body?: string | Buffer): Promise<TaurusPacket> {
    if (this.#closed) return Promise.reject(new Error('Taurus connection is closed'));
    const sequence = (this.#sequence += 1) >>> 0;
    const packet = encodeTaurusRequest(sequence, command, body);

    return new Promise<TaurusPacket>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.#pending.delete(sequence);
        reject(new Error(`Taurus request ${sequence} timed out`));
      }, this.timeout);
      this.#pending.set(sequence, { resolve, reject, timer });
      this.stream.write(packet, (error) => {
        if (!error) return;
        clearTimeout(timer);
        this.#pending.delete(sequence);
        reject(error);
      });
    });
  }

  async requestJson<T>(command: TaurusCommand, body?: unknown): Promise<T> {
    const response = await this.request(
      command,
      body === undefined ? undefined : JSON.stringify(body),
    );
    const responseBody = response.body.toString('utf8');
    if (response.res.status !== 0) throw new TaurusResponseError(response.res.status, responseBody);
    return (responseBody ? JSON.parse(responseBody) : undefined) as T;
  }

  close(): void {
    if (!this.stream.destroyed) this.stream.destroy();
    this.#close(new Error('Taurus connection closed'));
  }

  #onData(chunk: Buffer): void {
    this.#buffer = this.#buffer.length ? Buffer.concat([this.#buffer, chunk]) : chunk;
    while (this.#buffer.length >= TAURUS_HEADER_SIZE) {
      let packetSize: number | undefined;
      try {
        packetSize = getTaurusPacketSize(this.#buffer);
      } catch (error) {
        this.#close(error as Error);
        this.stream.destroy(error as Error);
        return;
      }
      if (packetSize === undefined || this.#buffer.length < packetSize) return;
      const raw = this.#buffer.subarray(0, packetSize);
      this.#buffer = this.#buffer.subarray(packetSize);
      const packet = decodeTaurusPacket(raw);
      if (packet.packetType !== TAURUS_RESPONSE) continue;
      const pending = this.#pending.get(packet.sequence);
      if (!pending) continue;
      clearTimeout(pending.timer);
      this.#pending.delete(packet.sequence);
      pending.resolve(packet);
    }
  }

  #close(error: Error): void {
    if (this.#closed) return;
    this.#closed = true;
    for (const pending of this.#pending.values()) {
      clearTimeout(pending.timer);
      pending.reject(error);
    }
    this.#pending.clear();
  }
}
