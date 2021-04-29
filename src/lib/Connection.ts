import { Duplex } from 'stream';

import NovastarDecoder from './NovastarDecoder';
import NovastarEncoder from './NovastarEncoder';
import { ErrorType, Package } from './Package';
import RequestPackage from './RequestPackage';

type ResolveResponse = (res: Package) => void;

type WaitingRequest = [req: RequestPackage, resolve: ResolveResponse];

export default class Connection<S extends Duplex> {
  private encoder = new NovastarEncoder();

  private decoder = new NovastarDecoder();

  private connected = false;

  protected ready = Promise.resolve();

  constructor(readonly stream: S, public timeout = 3000) {}

  protected queue: WaitingRequest[] = [];

  get isConnected(): boolean {
    return this.connected;
  }

  public async start(): Promise<void> {
    if (this.connected) return;
    this.decoder.on('data', this.listener);
    this.stream.pipe(this.decoder);
    this.encoder.pipe(this.stream);
    this.connected = true;
  }

  public stop(): void {
    if (!this.connected) return;
    this.decoder.off('data', this.listener);
    this.stream.unpipe(this.decoder);
    this.encoder.unpipe(this.stream);
    this.connected = false;
  }

  public async send(req: RequestPackage): Promise<Package> {
    await this.sendImpl(req);
    const res = await this.wait(req);
    if (res.ack !== ErrorType.Succeeded)
      throw new Error(ErrorType[res.ack] ?? `Unknown error: ${res.ack}`);
    return res;
  }

  protected sendImpl(req: RequestPackage): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ready = this.ready.finally(async () => {
        if (!this.connected) return reject(new Error('Connection closed'));
        req.updateCrc();
        if (!this.encoder.write(req)) {
          await new Promise(cb => this.encoder.once('drain', cb));
        }
        // console.log('send', req.raw);
        return resolve();
      });
    });
  }

  protected wait(req: RequestPackage): Promise<Package> {
    return new Promise<Package>((resolve, reject) => {
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

  protected listener = (res: Package): void => {
    // console.log('RES', Struct.raw(res));
    const [, resolve] = this.queue.find(([req]) => req.serialNumber === res.serialNumber) ?? [];
    if (resolve) resolve(res);
    // else console.warn(`Unknown package ${JSON.stringify(res)}`);
  };
}
