import { Connection, Session } from '@novastar/codec';
import SerialPort, { OpenOptions, PortInfo } from 'serialport';
import { TypedEmitter } from 'tiny-typed-emitter';

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

interface SerialBindingEvents {
  open(path: string): void;
  close(path: string): void;
}

class SerialBinding extends TypedEmitter<SerialBindingEvents> {
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
          connection.open().then(() => {
            session = new Session(connection);
            this.sessions[path] = session;
            connection.once('close', () => this.close(path));
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
      const { stream: serial } = connection;
      if (serial.isOpen) serial.close();
      this.emit('close', path);
    }
    return session !== undefined;
  }

  getSessions(): Session<SerialPort>[] {
    return Object.values(this.sessions);
  }
}

const serial = new SerialBinding();

const release = () => serial.getSessions().forEach(session => session.close());

process.on('SIGINT', release);
process.on('SIGTERM', release);

export default serial;
