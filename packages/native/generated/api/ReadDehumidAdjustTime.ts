import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDehumidAdjustTime(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadDehumidAdjustTime(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadDehumidAdjustTime(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.DehumidAdjustTimeOccupancy, 'ReadDehumidAdjustTime');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DehumidAdjustTimeAddr;
  return req;
}
Session.prototype.ReadDehumidAdjustTime = async function ReadDehumidAdjustTime(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadDehumidAdjustTime(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDehumidAdjustTime = async function tryReadDehumidAdjustTime(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadDehumidAdjustTime(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
