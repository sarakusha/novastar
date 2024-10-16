import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadTotalUnitNumPerSubField(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadTotalUnitNumPerSubField(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadTotalUnitNumPerSubField(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.TotalUnitNumPerSubFieldOccupancy,
    'ReadTotalUnitNumPerSubField'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.TotalUnitNumPerSubFieldAddr;
  return req;
}
Session.prototype.ReadTotalUnitNumPerSubField = async function ReadTotalUnitNumPerSubField(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadTotalUnitNumPerSubField(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadTotalUnitNumPerSubField = async function tryReadTotalUnitNumPerSubField(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadTotalUnitNumPerSubField(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
