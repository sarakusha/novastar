import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    WriteScannerDoubleLock(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    tryWriteScannerDoubleLock(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createWriteScannerDoubleLock<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  if (data.length !== 1) throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, bBroadcast, 'WriteScannerDoubleLock');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerDoubleLockAddr;
  return req;
}
Session.prototype.WriteScannerDoubleLock = async function WriteScannerDoubleLock(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createWriteScannerDoubleLock(addr, portAddr, scanBoardAddr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.tryWriteScannerDoubleLock = async function tryWriteScannerDoubleLock(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  data: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createWriteScannerDoubleLock(addr, portAddr, scanBoardAddr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
