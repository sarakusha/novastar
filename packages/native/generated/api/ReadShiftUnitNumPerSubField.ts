import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadShiftUnitNumPerSubField(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadShiftUnitNumPerSubField(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadShiftUnitNumPerSubField(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.ShiftUnitNumPerSubFieldOccupancy,
    'ReadShiftUnitNumPerSubField'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ShiftUnitNumPerSubFieldAddr;
  return req;
}
Session.prototype.ReadShiftUnitNumPerSubField = async function ReadShiftUnitNumPerSubField(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadShiftUnitNumPerSubField(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadShiftUnitNumPerSubField = async function tryReadShiftUnitNumPerSubField(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadShiftUnitNumPerSubField(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
