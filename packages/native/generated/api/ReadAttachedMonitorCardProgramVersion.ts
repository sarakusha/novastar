import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadAttachedMonitorCardProgramVersion(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadAttachedMonitorCardProgramVersion(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadAttachedMonitorCardProgramVersion(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.AttachedMonitorCardProgramVersionOccupancy,
    'ReadAttachedMonitorCardProgramVersion'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.AttachedMonitorCardProgramVersionAddr;
  return req;
}
Session.prototype.ReadAttachedMonitorCardProgramVersion =
  async function ReadAttachedMonitorCardProgramVersion(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = createReadAttachedMonitorCardProgramVersion(addr, portAddr, scanBoardAddr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadAttachedMonitorCardProgramVersion =
  async function tryReadAttachedMonitorCardProgramVersion(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Packet | null> {
    const req = createReadAttachedMonitorCardProgramVersion(addr, portAddr, scanBoardAddr);
    return this.connection.trySend(req);
  };
