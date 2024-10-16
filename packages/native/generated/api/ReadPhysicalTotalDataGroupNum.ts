import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadPhysicalTotalDataGroupNum(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadPhysicalTotalDataGroupNum(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadPhysicalTotalDataGroupNum(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.PhysicalTotalDataGroupNumOccupancy,
    'ReadPhysicalTotalDataGroupNum'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.PhysicalTotalDataGroupNumAddr;
  return req;
}
Session.prototype.ReadPhysicalTotalDataGroupNum = async function ReadPhysicalTotalDataGroupNum(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadPhysicalTotalDataGroupNum(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadPhysicalTotalDataGroupNum =
  async function tryReadPhysicalTotalDataGroupNum(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Packet | null> {
    const req = createReadPhysicalTotalDataGroupNum(addr, portAddr, scanBoardAddr);
    return this.connection.trySend(req);
  };
