import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadLowAshCompensation(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadLowAshCompensation(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadLowAshCompensation(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.LowAshCompensationOccupancy, 'ReadLowAshCompensation');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LowAshCompensationAddr;
  return req;
}
Session.prototype.ReadLowAshCompensation = async function ReadLowAshCompensation(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadLowAshCompensation(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadLowAshCompensation = async function tryReadLowAshCompensation(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadLowAshCompensation(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
