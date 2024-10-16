import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    WriteScanerSdramToSlaveFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean
    ): Promise<void>;
    tryWriteScanerSdramToSlaveFlash(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<ErrorType | null>;
  }
}
export default function createWriteScanerSdramToSlaveFlash<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast
): Request<Broadcast> {
  const req = new Request([133], bBroadcast, 'WriteScanerSdramToSlaveFlash');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerSdramToSlaveFlash;
  return req;
}
Session.prototype.WriteScanerSdramToSlaveFlash = async function WriteScanerSdramToSlaveFlash(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean
): Promise<void> {
  const req = createWriteScanerSdramToSlaveFlash(addr, portAddr, scanBoardAddr, bBroadcast);
  await this.connection.send(req);
};
Session.prototype.tryWriteScanerSdramToSlaveFlash = async function tryWriteScanerSdramToSlaveFlash(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<ErrorType | null> {
  const req = createWriteScanerSdramToSlaveFlash(addr, portAddr, scanBoardAddr, false);
  return (await this.connection.trySend(req))?.ack ?? null;
};
