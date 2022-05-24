import * as dgram from 'dgram';
import { createConnection, Socket } from 'net';
import os, { NetworkInterfaceInfo } from 'os';

import { API, Connection, notEmpty, Session } from '@novastar/codec';
import debugFactory from 'debug';
import { TypedEmitter } from 'tiny-typed-emitter';

const debug = debugFactory('novastar:net');

export const UDP_PORT = 3800;
export const MULTICAST_ADDRESS = '224.224.125.119';
const UDP_TIMEOUT = 1000;
const REQ = 'rqProMI:';
const RES = 'rpProMI:';
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
}

const interfaceSearch = (address: string): Promise<string[]> =>
  new Promise<string[]>(resolve => {
    const socket = dgram.createSocket('udp4');
    let completed = false;
    let timer: NodeJS.Timeout | undefined;
    const list: string[] = [];
    const complete = (): void => {
      timer && clearTimeout(timer);
      socket.close();
      if (!completed) {
        completed = true;
        resolve(list);
        debug(`stop: ${address}`);
      }
    };
    socket.on('error', complete);
    socket.on('message', (msg, rinfo) => {
      if (msg.toString().startsWith(RES) && !completed && !list.includes(rinfo.address)) {
        list.push(rinfo.address);
        debug(`found: ${rinfo.address}`);
      }
    });
    socket.bind(UDP_PORT, address, () => {
      socket.setBroadcast(true);
      socket.addMembership(MULTICAST_ADDRESS, address);
      timer = setTimeout(complete, UDP_TIMEOUT);
      socket.send(REQ, UDP_PORT, '255.255.255.255', err => err && complete());
      debug(`start: ${address}`);
    });
  });

/**
 * Finding network devices
 * @returns {Promise<string[]>} - addresses of found devices
 */
export const findNetDevices = async (): Promise<string[]> => {
  const interfaces = Object.values<NetworkInterfaceInfo[] | undefined>(os.networkInterfaces())
    .filter(notEmpty)
    .reduce<NetworkInterfaceInfo[]>((res, values) => [...res, ...values], [])
    .filter(nic => !nic.internal && nic.family === 'IPv4')
    .map(({ address }) => address);
  const results = await Promise.all(interfaces.map(interfaceSearch));
  return results.reduce<string[]>(
    (acc, list) => [...acc, ...list.filter(host => !acc.includes(host))],
    []
  );
};

/**
 * Network Session type
 */
export type NetSession = Session<Socket> & API;

/**
 * @internal For documentation purposes only. Use singleton instance exported as default
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
   * @param host
   * @param port
   */
  open(host: string, port = TCP_PORT): NetSession {
    const address = `${host}:${port}`;
    if (this.sessions[address]) return this.sessions[address];
    const socket = createConnection(port, host, () => {
      this.emit('open', address);
      debug(`connection ${address} opened`);
    });
    socket.setKeepAlive(true, KEEP_ALIVE_DELAY);
    const connection = new Connection(socket, true, TCP_TIMEOUT);
    connection.once('close', () => this.close(host, port));
    const session = new Session(connection);
    this.#sessions[address] = session;
    socket.on('close', () => {
      delete this.#sessions[address];
      session.close();
      this.emit('close', address);
    });
    return session;
  }

  /**
   * Close network session
   * @param host
   * @param port
   * @returns `false` if no connection is found
   */
  close(host: string, port = TCP_PORT): boolean {
    const address = `${host}:${port}`;
    const session = this.sessions[address];
    if (session) {
      const { connection } = session;
      const { stream: socket } = connection;
      if (!socket.destroyed) socket.destroy();
      debug(`connection ${address} closed`);
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
const net = new NetBinding();

export default net;
