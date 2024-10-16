import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetLockMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      lockMode: number
    ): Promise<void>;
    trySetLockMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      lockMode: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetLockMode<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  lockMode: number
): Request<Broadcast> {
  const $data = encodeUIntLE(lockMode, AddressMapping.LockModeOccupancy);
  const req = new Request($data, bBroadcast, 'SetLockMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LockModeAddr;
  return req;
}
Session.prototype.SetLockMode = async function SetLockMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  lockMode: number
): Promise<void> {
  const req = createSetLockMode(addr, portAddr, scanBoardAddr, bBroadcast, lockMode);
  await this.connection.send(req);
};
Session.prototype.trySetLockMode = async function trySetLockMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  lockMode: number
): Promise<ErrorType | null> {
  const req = createSetLockMode(addr, portAddr, scanBoardAddr, false, lockMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
