import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Read2055RegisterData(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryRead2055RegisterData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createRead2055RegisterData(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.Config2055RegisterOccupancy, 'Read2055RegisterData');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Config2055RegisterAddr;
  return req;
}
Session.prototype.Read2055RegisterData = async function Read2055RegisterData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createRead2055RegisterData(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryRead2055RegisterData = async function tryRead2055RegisterData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createRead2055RegisterData(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
