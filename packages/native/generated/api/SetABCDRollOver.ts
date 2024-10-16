import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetABCDRollOver(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      isRollOver: boolean
    ): Promise<void>;
    trySetABCDRollOver(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      isRollOver: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetABCDRollOver<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  isRollOver: boolean
): Request<Broadcast> {
  const req = new Request(!isRollOver ? Buffer.alloc(1) : [1], bBroadcast, 'SetABCDRollOver');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ABCDRollOverAddr;
  return req;
}
Session.prototype.SetABCDRollOver = async function SetABCDRollOver(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  isRollOver: boolean
): Promise<void> {
  const req = createSetABCDRollOver(addr, portAddr, scanBoardAddr, bBroadcast, isRollOver);
  await this.connection.send(req);
};
Session.prototype.trySetABCDRollOver = async function trySetABCDRollOver(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  isRollOver: boolean
): Promise<ErrorType | null> {
  const req = createSetABCDRollOver(addr, portAddr, scanBoardAddr, false, isRollOver);
  return (await this.connection.trySend(req))?.ack ?? null;
};
