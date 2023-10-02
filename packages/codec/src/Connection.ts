import { Duplex } from 'stream';

import debugFactory from 'debug';
import pump from 'pump';
import { TypedEmitter } from 'tiny-typed-emitter';

import ConnectionClosedError from './ConnectionClosedError';
import NovastarDecoder from './NovastarDecoder';
import NovastarEncoder from './NovastarEncoder';
import { ErrorType, Packet } from './Packet';
import Request, { isNotBroadcast } from './Request';
import ResponseError from './ResponseError';
import TimeoutError from './TimeoutError';
import { delay, notEmpty, series } from './helper';

type ResolveResponse = (res: Packet) => void;

type WaitingRequest = [req: Request, resolve: ResolveResponse];

export interface ConnectionEvents {
  /**
   * The open event happens when the connection is opened and ready for writing
   */
  open(): void;
  /**
   * The close event is emitted when the connection is closed.
   */
  close(): void;
}

const debug = debugFactory('novastar:connection');

type Result<SkipErrors extends boolean = false> = SkipErrors extends false ? Packet : Packet | null;

type Response<Broadcast extends boolean, SkipErrors extends boolean = false> = Promise<Broadcast extends false
  ? Result<SkipErrors>
  : void>;

/**
 * Wrapper for I/O stream using {@link Request} for out and {@link Packet} to in
 */
export default class Connection<S extends Duplex> extends TypedEmitter<ConnectionEvents> {
  /**
   * Default timeout for this connection
   */
  public timeout = 1000;

  /**
   * Maximum default data length in single {@link Request} for this connection
   */
  public maxLength = 256;

  protected ready = Promise.resolve();

  protected queue: WaitingRequest[] = [];

  private encoder: NovastarEncoder | undefined;

  private decoder: NovastarDecoder | undefined;

  private connected = false;

  /**
   * Constructor
   * @param stream - wrapped I/O stream
   * @param open - automatically opens this connection, see {@link Connection.open}
   * @param timeout - default timeout for this connection
   */
  constructor(readonly stream: S, open = true, timeout = 1000) {
    super();
    this.timeout = timeout;
    if (open) this.open();
  }

  /**
   * Returns true if the connection is ready for writing.
   */
  get isConnected(): boolean {
    return this.connected;
  }

  /**
   * Pipes streams (encoder->stream->decoder) together.
   * Emits {@link ConnectionEvents.open}
   */
  public open(): void {
    if (this.connected) return;
    this.decoder = new NovastarDecoder();
    this.encoder = new NovastarEncoder();
    this.decoder.on('data', this.listener);
    pump(this.encoder, this.stream, this.decoder, (err) => {
      err && debug(`Error while pump: ${err.message}`);
      this.close();
    });
    this.connected = true;
    debug('open');
    this.emit('open');
  }

  /**
   * Detaches streams. Emits {@link ConnectionEvents.close}
   */
  public close(): void {
    if (!this.connected) return;
    this.connected = false;
    this.decoder?.off('data', this.listener);
    this.stream.unpipe(this.decoder);
    this.encoder?.unpipe(this.stream);
    this.decoder?.destroy();
    this.decoder = undefined;
    this.encoder?.destroy();
    this.encoder = undefined;
    debug('close');
    this.emit('close');
  }

  /**
   * Decodes the request and sends the raw data to the stream after the previous operation
   * completes, If the request `length` exceeds the `maxLength`, the request will be split into
   * multiple requests and responses will be composed.
   * @param req - request
   * @returns If the request is not broadcast, then a successful response to the request is
   * returned. If the response status is not successful or a timeout occurs, an exception is thrown.
   * @see TimeoutError
   * @see ResponseError
   */
  public send<Broadcast extends boolean>(req: Request<Broadcast>): Response<Broadcast>;

  public send(req: Request<boolean>): Promise<Packet | void> {
    return new Promise<Packet | void>((resolve, reject) => {
      this.ready = this.ready.finally().then(() => {
        const chunks = Request.makeChunks(req, this.getMaxLength(req));
        return series(chunks, chunk => this.sendImpl(chunk))
          .then(results => {
            const responses = results.filter(notEmpty);
            if (responses.length === 0) return resolve();
            const [first] = responses;
            if (responses.length === 1) return resolve(first);
            const srcRaw = Packet.raw(first);
            const total = Buffer.concat(responses.map(res => res.data));
            const result = new Packet(total.length + Packet.baseSize);
            srcRaw.copy(Packet.raw(result));
            // Object.entries(first.toJSON()).forEach(([name, value]) => {
            //   if (name !== 'data') {
            //     (result as Record<string, unknown>)[name] = value;
            //   }
            // });
            result.length = total.length;
            total.copy(result.data);
            Packet.crc(result, true);
            return resolve(result);
          })
          .catch(reject);
      });
    });
  }

  /**
   * Sends a request, `length` of which does not exceed `maxLength`.
   * @param req
   * @returns In case of no response by timeout, returns null. Don't forget to check the `ack`
   * status of a response packet.
   */
  public trySend(req: Request): Promise<Packet | null> {
    return new Promise<Packet | null>((resolve, reject) => {
      this.ready = this.ready.finally().then(() => this.sendImpl(req, true).then(resolve, reject));
    });
  }

  protected sendImpl<Broadcast extends boolean, SkipErrors extends boolean = false>(
    req: Request<Broadcast>,
    skipError?: SkipErrors,
  ): Response<Broadcast, SkipErrors>;

  protected async sendImpl(
    req: Request<boolean>,
    skipErrors?: boolean,
  ): Promise<Packet | null | void> {
    const {
      connected,
      encoder,
    } = this;
    if (!connected || !encoder) throw new ConnectionClosedError();
    const maxLength = this.getMaxLength(req);
    if (req.length > maxLength)
      throw new TypeError(
        `The request size is too large. Use "send" instead of "trySend", maxLength: ${maxLength}`,
      );
    if (!encoder.write(req)) {
      await new Promise<void>(resolve => {
        encoder.once('drain', resolve);
      });
    }
    if (isNotBroadcast(req)) {
      const res = await this.wait(req, skipErrors);
      if (!skipErrors && res && res.ack !== ErrorType.Succeeded) {
        const err = new ResponseError(res, req.tag);
        debug(err.message);
        throw err;
      }
      return res;
    }
    return delay(50);
  }

  protected wait<SkipErrors extends boolean = false>(
    req: Request,
    skipErrors?: SkipErrors,
  ): Promise<Result<SkipErrors>>;

  protected wait(req: Request, skipErrors?: boolean): Promise<Packet | null> {
    return new Promise<Packet | null>((resolve, reject) => {
      let timer: NodeJS.Timeout;
      const complete = (): void => {
        clearTimeout(timer);
        this.queue = this.queue.filter(([request]) => req !== request);
      };
      const rejectTimeout = (): void => {
        complete();
        if (skipErrors) return resolve(null);
        const err = new TimeoutError(req, req.tag);
        debug(err.message);
        return reject(err);
      };
      const resolveResponse: ResolveResponse = res => {
        complete();
        resolve(res);
      };
      timer = global.setTimeout(rejectTimeout, req.timeout ?? this.timeout);
      this.queue.push([req, resolveResponse]);
    });
  }

  protected listener = (res: Packet): void => {
    const [, resolve] = this.queue.find(([req]) => req.serno === res.serno) ?? [];
    if (resolve) resolve(res);
    else if (res.source !== 255) debug(`Unknown package ${JSON.stringify(res)}`);
  };

  protected getMaxLength(req: Request<boolean>): number {
    return req.maxLength || this.maxLength || 256;
  }
}
