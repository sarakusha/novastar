import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadAttachedMonitorCardExist(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadAttachedMonitorCardExist(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadAttachedMonitorCardExist(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.AttachedMonitorCardExistOccupancy,
    'ReadAttachedMonitorCardExist'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.AttachedMonitorCardExistAddr;
  return req;
}
Session.prototype.ReadAttachedMonitorCardExist = async function ReadAttachedMonitorCardExist(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadAttachedMonitorCardExist(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadAttachedMonitorCardExist = async function tryReadAttachedMonitorCardExist(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadAttachedMonitorCardExist(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
