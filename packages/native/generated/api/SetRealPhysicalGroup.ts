import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetRealPhysicalGroup(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      realPhysical: number
    ): Promise<void>;
    trySetRealPhysicalGroup(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      realPhysical: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetRealPhysicalGroup<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  realPhysical: number
): Request<Broadcast> {
  const req = new Request([realPhysical], bBroadcast, 'SetRealPhysicalGroup');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.RealPhysicalGroupNumAddr;
  return req;
}
Session.prototype.SetRealPhysicalGroup = async function SetRealPhysicalGroup(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  realPhysical: number
): Promise<void> {
  const req = createSetRealPhysicalGroup(addr, portAddr, scanBoardAddr, bBroadcast, realPhysical);
  await this.connection.send(req);
};
Session.prototype.trySetRealPhysicalGroup = async function trySetRealPhysicalGroup(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  realPhysical: number
): Promise<ErrorType | null> {
  const req = createSetRealPhysicalGroup(addr, portAddr, scanBoardAddr, false, realPhysical);
  return (await this.connection.trySend(req))?.ack ?? null;
};
