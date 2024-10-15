import * as dgram from 'dgram';
import { createConnection, Socket } from 'net';
import os, { NetworkInterfaceInfo } from 'os';

import { API, Connection, delay, notEmpty, Session } from '@novastar/codec';
import debugFactory from 'debug';
import { TypedEmitter } from 'tiny-typed-emitter';

const debug = debugFactory('novastar:net');

export const UDP_PORT = 3800;
export const MULTICAST_ADDRESS = '224.224.125.119';
const UDP_TIMEOUT = 1000;
export const REQ = 'rqProMI:';
export const RES = 'rpProMI:';
export const TCP_PORT = 5200;
const TCP_TIMEOUT = 1000;
const KEEP_ALIVE_DELAY = 30000;

export interface NetBindingEvents {
  /**
   * @event open Triggered once after opening a connection to a device
   * @param address Device address
   */
  open(address: string): void;

  /**
   * @event close Triggered once after closing a connection to a device
   * @param address Device address
   */
  close(address: string): void;

  disconnect(address: string): void;
}

const interfaceSearch = (address: string, dest = '255.255.255.255'): Promise<string[]> =>
  new Promise<string[]>(resolve => {
    const socket = dgram.createSocket('udp4');
    let completed = false;
    let timer: NodeJS.Timeout | undefined;
    const list: string[] = [];
    const complete = (): void => {
      clearTimeout(timer);
      socket.close();
      if (!completed) {
        completed = true;
        resolve(list);
        // debug(`stop: ${address}`);
      }
    };
    socket.on('error', complete);
    socket.on('message', (msg, rinfo) => {
      if (msg.toString().startsWith(RES) && !completed && !list.includes(rinfo.address)) {
        list.push(rinfo.address);
        // debug(`found: ${rinfo.address}`);
      }
    });
    socket.bind(UDP_PORT, address, () => {
      socket.setBroadcast(true);
      socket.addMembership(MULTICAST_ADDRESS, address);
      socket.setMulticastTTL(128);
      timer = setTimeout(complete, UDP_TIMEOUT);
      socket.send(REQ, UDP_PORT, dest, err => err && complete());
      // debug(`start: ${address}`);
    });
  });

/**
 * Finding network devices
 * @returns {Promise<string[]>} - addresses of found devices
 */
export const findNetDevices = async (dest?: string): Promise<string[]> => {
  const interfaces = Object.values<NetworkInterfaceInfo[] | undefined>(os.networkInterfaces())
    .filter(notEmpty)
    .reduce<NetworkInterfaceInfo[]>((res, values) => [...res, ...values], [])
    .filter(nic => !nic.internal && nic.family === 'IPv4')
    .map(({ address }) => address);
  const results = await Promise.all(interfaces.map(address => interfaceSearch(address, dest)));
  return results.reduce<string[]>(
    (acc, list) => [...acc, ...list.filter(host => !acc.includes(host))],
    [],
  );
};

/**
 * Network Session type
 */
export type NetSession = Session<Socket> & API;

const parseAddress = (address: string): [host: string, port: number] => {
  const [host, port = TCP_PORT] = address.split(':', 2);
  return [host, +port];
};

/**
 * @internal For documentation purposes only. Use singleton instance exported as `net`
 */
export class NetBinding extends TypedEmitter<NetBindingEvents> {
  #sessions: Record<string, NetSession> = {};

  /**
   * Get all network sessions
   */
  get sessions(): Readonly<Record<string, NetSession>> {
    return this.#sessions;
  }

  /**
   * Connect to network device and open a new session
   * @param address host(:port)?
   */
  open(address: string): NetSession {
    const [host, port] = parseAddress(address);
    const fullAddress = `${host}:${port}`;
    if (this.sessions[fullAddress]) return this.sessions[fullAddress];
    const socket = createConnection(port, host);
    const connection = new Connection(socket, false, TCP_TIMEOUT);
    socket.on('connect', () => {
      connection.open();
    });
    connection.on('open', () => {
      this.emit('open', fullAddress);
      debug(`connection ${fullAddress} opened`);
    });
    socket.setKeepAlive(true, KEEP_ALIVE_DELAY);
    const session = new Session(connection);
    this.#sessions[fullAddress] = session;
    let reconnectRequired = true;
    socket.on('error', err => {
      const { code } = err as NodeJS.ErrnoException;
      if (code && ['ECONNREFUSED', 'ECONNRESET'].includes(code))
        reconnectRequired = false;
    });
    socket.on('close', async hadError => {
      connection.close();
      if (hadError && reconnectRequired) {
        debug('try reconnect');
        reconnectRequired = false;
        this.emit('disconnect', fullAddress);
        await delay(1000);
        socket.connect(port, host, () => {
          reconnectRequired = true;
        });
      } else {
        delete this.#sessions[fullAddress];
        this.close(fullAddress);
        this.emit('close', fullAddress);
      }
    });
    return session;
  }

  /**
   * Close network session
   * @param address host(:port)?
   * @returns `false` if no connection is found
   */
  close(address: string): boolean {
    const [host, port] = parseAddress(address);
    const fullAddress = `${host}:${port}`;
    const session = this.sessions[fullAddress];
    if (session) {
      const { connection } = session;
      const { stream: socket } = connection;
      if (!socket.destroyed) socket.destroy();
      debug(`connection ${fullAddress} closed`);
    }
    return session !== undefined;
  }

  /**
   * Close all network sessions
   */
  release(): void {
    Object.values(this.sessions).forEach(session => session.close());
  }
}

/**
 * Binding to work with network devices
 */
export const net = new NetBinding();
