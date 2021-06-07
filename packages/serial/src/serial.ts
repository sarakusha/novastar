import { Connection, Session } from '@novastar/codec';
import SerialPort, { OpenOptions, PortInfo } from 'serialport';
import { TypedEmitter } from 'tiny-typed-emitter';

export type KnownDevices = ReadonlyArray<readonly [vendorId: string, productId: string]>;

const knownDevices: KnownDevices = [['10c4', 'ea60']];

const isNovastarUSBDevice =
  (known = knownDevices) =>
  (portInfo: PortInfo): boolean =>
    known.findIndex(
      ([vendorId, productId]) =>
        vendorId.toLowerCase() === portInfo.vendorId?.toLowerCase() &&
        productId.toLowerCase() === portInfo.productId?.toLowerCase()
    ) !== -1;

interface SerialBindingEvents {
  open(path: string): void;
  close(path: string): void;
}

export type SerialSession = Session<SerialPort>;

class SerialBinding extends TypedEmitter<SerialBindingEvents> {
  private sessions: Record<string, SerialSession> = {};

  findSendingCards = async (known: KnownDevices = []): Promise<PortInfo[]> => {
    const ports = await SerialPort.list();
    return ports.filter(isNovastarUSBDevice(knownDevices.concat(known)));
  };

  open(path: string, openOptions: OpenOptions = { baudRate: 115200 }): Promise<SerialSession> {
    return new Promise<SerialSession>((resolve, reject) => {
      let session = this.sessions[path];
      if (session) {
        resolve(session);
      } else {
        const port = new SerialPort(path, openOptions, err => {
          if (err) reject(err);
          else {
            const connection = new Connection(port);
            session = new Session(connection);
            this.sessions[path] = session;
            connection.once('close', () => this.close(path));
            resolve(session);
            this.emit('open', path);
          }
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
      const { stream: serial } = connection;
      if (serial.isOpen) serial.close();
      this.emit('close', path);
    }
    return session !== undefined;
  }

  getSessions(): SerialSession[] {
    return Object.values(this.sessions);
  }
}

const serial = new SerialBinding();

const release = () => serial.getSessions().forEach(session => session.close());

process.on('SIGINT', release);
process.on('SIGTERM', release);

export default serial;
