import { Duplex } from 'stream';

import Connection from './Connection';

/**
 * Base implementation of the extensible `Session` class
 */
export interface Session<S extends Duplex = Duplex> {
  /**
   * Current connection to interact with the device
   */
  readonly connection: Connection<S>;

  /**
   * Is current [connection]{@link Session.connection} active
   */
  readonly isConnected: boolean;

  /**
   * Change the current timeout keeping the previous value
   * @param timeout
   */
  pushTimeout(timeout: number): void;

  /**
   * Restore previous timeout value
   */
  popTimeout(): number;

  /**
   * Close current connection
   */
  close(): boolean;
}

/**
 * API extensible via plugins from @novastar/gen.
 * @description Original API contains more than a thousand methods, and you won't need all of
 * them, so you just include the methods you need, and they will be embedded into your `Session`
 * instance
 */
export interface API {
  readonly version: '2.0';
}

export interface SessionStatic {
  new <S extends Duplex>(connection: Connection<S>): Session<S> & API;
}

class SessionImpl<S extends Duplex> implements Session<S> {
  constructor(readonly connection: Connection<S>) {}

  get isConnected(): boolean {
    return this.connection.isConnected;
  }

  readonly version = '2.0';

  close(): boolean {
    if (!this.connection.isConnected) return false;
    this.connection.close();
    return true;
  }

  pushTimeout(timeout: number): void {
    if (timeout <= 0) throw new TypeError('Invalid timeout');
    this.#timeouts.push(this.connection.timeout);
    this.connection.timeout = timeout;
  }

  popTimeout(): number {
    const timeout = this.#timeouts.pop();
    if (timeout) {
      this.connection.timeout = timeout;
    }
    return timeout ?? this.connection.timeout;
  }

  #timeouts: number[] = [];
}

/**
 * @function Session
 */
export const Session: SessionStatic = SessionImpl;
