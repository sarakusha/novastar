import { Duplex } from 'stream';

import pump from 'pump';
import { TypedEmitter } from 'tiny-typed-emitter';

import NovastarDecoder from './NovastarDecoder';
import NovastarEncoder from './NovastarEncoder';
import { ErrorType, Packet } from './Packet';
import Request from './Request';

type ResolveResponse = (res: Packet) => void;

type WaitingRequest = [req: Request, resolve: ResolveResponse];

interface ConnectionEvents {
  open(): void;
  close(): void;
}

export default class Connection<S extends Duplex> extends TypedEmitter<ConnectionEvents> {
  private encoder = new NovastarEncoder();

  private decoder = new NovastarDecoder();

  private connected = false;

  protected ready = Promise.resolve();

  constructor(readonly stream: S, public timeout = 3000) {
    super();
  }

  protected queue: WaitingRequest[] = [];

  get isConnected(): boolean {
    return this.connected;
  }

  public async open(): Promise<void> {
    if (this.connected) return;
    this.decoder.on('data', this.listener);
    pump(this.encoder, this.stream, this.decoder, () => this.close());
    this.connected = true;
    this.emit('open');
  }

  public close(): void {
    if (!this.connected) return;
    this.connected = false;
    this.decoder.off('data', this.listener);
    this.stream.unpipe(this.decoder);
    this.encoder.unpipe(this.stream);
    this.emit('close');
  }

  public async send(req: Request): Promise<Packet> {
    const res = await this.sendImpl(req);
    if (res.ack !== ErrorType.Succeeded)
      throw new Error(ErrorType[res.ack] ?? `Unknown error: ${res.ack}`);
    return res;
  }

  protected sendImpl(req: Request): Promise<Packet> {
    return new Promise((resolve, reject) => {
      this.ready = this.ready.finally(async () => {
        if (!this.connected) return reject(new Error('Connection closed'));
        if (!this.encoder.write(req)) {
          await new Promise(cb => this.encoder.once('drain', cb));
        }
        const res = await this.wait(req);
        // console.log('send', req.raw);
        return resolve(res);
      });
    });
  }

  protected wait(req: Request): Promise<Packet> {
    return new Promise<Packet>((resolve, reject) => {
      let timer: NodeJS.Timer;
      const complete = (): void => {
        global.clearTimeout(timer);
        this.queue = this.queue.filter(([request]) => req !== request);
      };
      const rejectTimeout = (): void => {
        complete();
        reject(new Error('Timeout error'));
      };
      const resolveResponse: ResolveResponse = res => {
        complete();
        resolve(res);
      };
      timer = global.setTimeout(rejectTimeout, this.timeout);
      this.queue.push([req, resolveResponse]);
    });
  }

  protected listener = (res: Packet): void => {
    const [, resolve] = this.queue.find(([req]) => req.serno === res.serno) ?? [];
    if (resolve) resolve(res);
    // else console.warn(`Unknown package ${JSON.stringify(res)}`);
  };
}
