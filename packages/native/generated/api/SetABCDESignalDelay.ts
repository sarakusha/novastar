import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetABCDESignalDelay(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      ABCDESignalDelay: number
    ): Promise<void>;
    trySetABCDESignalDelay(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      ABCDESignalDelay: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetABCDESignalDelay<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  ABCDESignalDelay: number
): Request<Broadcast> {
  const req = new Request([ABCDESignalDelay], bBroadcast, 'SetABCDESignalDelay');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ABCDESignalDelayAddr;
  return req;
}
Session.prototype.SetABCDESignalDelay = async function SetABCDESignalDelay(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  ABCDESignalDelay: number
): Promise<void> {
  const req = createSetABCDESignalDelay(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    ABCDESignalDelay
  );
  await this.connection.send(req);
};
Session.prototype.trySetABCDESignalDelay = async function trySetABCDESignalDelay(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  ABCDESignalDelay: number
): Promise<ErrorType | null> {
  const req = createSetABCDESignalDelay(addr, portAddr, scanBoardAddr, false, ABCDESignalDelay);
  return (await this.connection.trySend(req))?.ack ?? null;
};
