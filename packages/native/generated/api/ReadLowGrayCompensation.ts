import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadLowGrayCompensation(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadLowGrayCompensation(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadLowGrayCompensation(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.LowGrayCompensationOccupancy, 'ReadLowGrayCompensation');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LowGrayCompensationAddr;
  return req;
}
Session.prototype.ReadLowGrayCompensation = async function ReadLowGrayCompensation(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadLowGrayCompensation(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadLowGrayCompensation = async function tryReadLowGrayCompensation(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadLowGrayCompensation(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
