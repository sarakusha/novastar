import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadLogicalTotalDataGroupNum(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadLogicalTotalDataGroupNum(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadLogicalTotalDataGroupNum(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.LogicalTotalDataGroupNumOccupancy,
    'ReadLogicalTotalDataGroupNum'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LogicalTotalDataGroupNumAddr;
  return req;
}
Session.prototype.ReadLogicalTotalDataGroupNum = async function ReadLogicalTotalDataGroupNum(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadLogicalTotalDataGroupNum(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadLogicalTotalDataGroupNum = async function tryReadLogicalTotalDataGroupNum(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadLogicalTotalDataGroupNum(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
