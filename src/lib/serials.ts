import SerialPort, { OpenOptions, PortInfo } from 'serialport';
import { TypedEmitter } from 'tiny-typed-emitter';

import Connection from './Connection';
import Session from './Session';

// lower case!
const knownDevices: ReadonlyArray<readonly [vendorId: string, productId: string]> = [
  ['10c4', 'ea60'],
];

const isNovastarUSBDevice = (portInfo: PortInfo): boolean =>
  knownDevices.findIndex(
    ([vendorId, productId]) =>
      vendorId === portInfo.vendorId?.toLowerCase() &&
      productId === portInfo.productId?.toLowerCase()
  ) !== -1;

interface SerialsEvents {
  open(path: string): void;
  close(path: string): void;
}

class Serials extends TypedEmitter<SerialsEvents> {
  private sessions: Record<string, Session<SerialPort>> = {};

  findSendingCards = async (): Promise<PortInfo[]> => {
    const ports = await SerialPort.list();
    return ports.filter(isNovastarUSBDevice);
  };

  open(
    path: string,
    openOptions: OpenOptions = { baudRate: 115200 }
  ): Promise<Session<SerialPort>> {
    return new Promise<Session<SerialPort>>((resolve, reject) => {
      let session = this.sessions[path];
      if (session) {
        resolve(session);
      } else {
        const port = new SerialPort(path, openOptions, () => {
          const connection = new Connection(port);
          connection.start().then(() => {
            session = new Session(connection);
            this.sessions[path] = session;
            session.once('close', () => this.close(path));
            resolve(session);
            this.emit('open', path);
          }, reject);
        });
        port.once('close', () => this.close(path));
      }
    });
  }

  close(path: string): boolean {
    const session = this.sessions[path];
    if (session) {
      delete this.sessions[path];
      session.close();
      const { connection } = session;
      const { stream } = connection;
      if (stream.isOpen) stream.close();
      this.emit('close', path);
    }
    return session !== undefined;
  }

  getSessions(): Session<SerialPort>[] {
    return Object.values(this.sessions);
  }
}

const serials = new Serials();

const release = () => serials.getSessions().forEach(session => session.close());

process.on('SIGINT', release);
process.on('SIGTERM', release);

export default serials;
