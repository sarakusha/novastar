import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadAttachedMonitorCardModle(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadAttachedMonitorCardModle(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadAttachedMonitorCardModle(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.AttachedMonitorCardModleOccupancy,
    'ReadAttachedMonitorCardModle'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.AttachedMonitorCardModleAddr;
  return req;
}
Session.prototype.ReadAttachedMonitorCardModle = async function ReadAttachedMonitorCardModle(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadAttachedMonitorCardModle(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadAttachedMonitorCardModle = async function tryReadAttachedMonitorCardModle(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadAttachedMonitorCardModle(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};