import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetLowGrayPull(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number
    ): Promise<void>;
    trySetLowGrayPull(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetLowGrayPull<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number
): Request<Broadcast> {
  const req = new Request([data], bBroadcast, 'SetLowGrayPull');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerLowGrayAddr;
  return req;
}
Session.prototype.SetLowGrayPull = async function SetLowGrayPull(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  data: number
): Promise<void> {
  const req = createSetLowGrayPull(addr, portAddr, scanBoardAddr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetLowGrayPull = async function trySetLowGrayPull(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  data: number
): Promise<ErrorType | null> {
  const req = createSetLowGrayPull(addr, portAddr, scanBoardAddr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
