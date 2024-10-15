import { API, Connection, Session } from '@novastar/codec';
import Conf, { Schema } from 'conf';
import debugFactory from 'debug';
import { SerialPort } from 'serialport';
import { OpenOptions, PortInfo } from '@serialport/bindings-cpp';
import { TypedEmitter } from 'tiny-typed-emitter';

export type KnownDevice = [vendorId: string, productId: string];

const debug = debugFactory('novastar:serial');

const schema: Schema<{ knownDevices: KnownDevice[] }> = {
  knownDevices: {
    type: 'array',
    items: {
      type: 'array',
      items: {
        type: 'string',
        pattern: '[0-9a-fA-F]+',
      },
      minItems: 2,
    },
    default: [['10c4', 'ea60']],
  },
};

const config = new Conf({ schema });

/**
 * Get all known devices
 */
export const getKnownDevices = (): ReadonlyArray<KnownDevice> => config.get('knownDevices');

debug(
  `known devices: ${getKnownDevices()
    .map(([VID, PID]) => `${VID}/${PID}`)
    .join(';')}`
);

/**
 * Add a new known device type
 * @param vendorId
 * @param productId
 */
export const addKnownDevice = (
  vendorId: string | number,
  productId: string | number
): ReadonlyArray<KnownDevice> => {
  const VID = typeof vendorId === 'number' ? vendorId.toString(16) : vendorId;
  const PID = typeof productId === 'number' ? productId.toString(16) : productId;
  const devs = getKnownDevices();
  if (devs.findIndex(([vid, pid]) => vid === VID && pid === PID) === -1) {
    config.set('knownDevices', [...devs, [VID, PID]]);
  }
  return getKnownDevices();
};

/**
 * Remove known device by VID,PID
 * @param vendorId
 * @param productId
 */
export const removeKnownDevice = (
  vendorId: string | number,
  productId: string | number
): ReadonlyArray<KnownDevice> => {
  const VID = typeof vendorId === 'number' ? vendorId.toString(16) : vendorId;
  const PID = typeof productId === 'number' ? productId.toString(16) : productId;
  config.set(
    'knownDevice',
    getKnownDevices().filter(([vid, pid]) => vid !== VID || pid !== PID)
  );
  return getKnownDevices();
};

/**
 * Clear all known devices
 */
export const clearKnownDevices = (): void => config.set('knownDevices', []);

const isNovastarUSBDevice =
  (known = getKnownDevices()) =>
  (portInfo: PortInfo): boolean =>
    known.findIndex(
      ([vendorId, productId]) =>
        vendorId.toLowerCase() === portInfo.vendorId?.toLowerCase() &&
        productId.toLowerCase() === portInfo.productId?.toLowerCase()
    ) !== -1;

export interface SerialBindingEvents {
  /**
   * @event open Triggered once after opening a connection to a device
   * @param path serial path
   */
  open(path: string): void;
  /**
   * @event close Triggered once after closing a connection to a device
   * @param path serial path
   */
  close(path: string): void;
}

/**
 * Serial Session type
 */
export type SerialSession = Session<SerialPort> & API;

/**
 * Finding serial devices
 * @param known
 * @returns {Promise<PortInfo[]>} - paths to found devices
 */
export const findSendingCards = async (
  known: ReadonlyArray<KnownDevice> = []
): Promise<PortInfo[]> => {
  const ports = await SerialPort.list();
  return ports.filter(isNovastarUSBDevice(getKnownDevices().concat(known)));
};

/**
 * @internal For documentation purposes only. Use singleton instance exported as `serial`
 */
export class SerialBinding extends TypedEmitter<SerialBindingEvents> {
  private sessions: Record<string, SerialSession> = {};

  /**
   * Connect to a serial device and open a serial session
   * @param opts
   */
  open(opts: OpenOptions): Promise<SerialSession> {
    return new Promise<SerialSession>((resolve, reject) => {
      const { path } = opts;
      let session = this.sessions[path];
      if (session) {
        resolve(session);
      } else {
        const port = new SerialPort(
          { ...opts, parity: 'none' },
          err => {
            if (err) reject(err);
            else {
              const connection = new Connection(port);
              session = new Session(connection);
              this.sessions[path] = session;
              connection.once('close', () => this.close(path));
              resolve(session);
              this.emit('open', path);
            }
          }
        );
        port.once('close', () => this.close(path));
      }
    });
  }

  /**
   * Close serial session
   * @param path
   */
  close(path: string): boolean {
    const session = this.sessions[path];
    if (session) {
      delete this.sessions[path];
      session.close();
      const { connection } = session;
      const { stream: serial } = connection;
      if (serial.isOpen) serial.close();
      this.emit('close', path);
    }
    return session !== undefined;
  }

  /**
   * Get all serial sessions
   */
  getSessions(): SerialSession[] {
    return Object.values(this.sessions);
  }

  /**
   * Close all serial sessions
   */
  release(): void {
    this.getSessions().forEach(session => session.close());
  }
}

/**
 * Binding to work with serial devices
 */
export const serial = new SerialBinding();

const release = () => serial.release();

process.on('SIGINT', release);
process.on('SIGTERM', release);

// export default serial;
