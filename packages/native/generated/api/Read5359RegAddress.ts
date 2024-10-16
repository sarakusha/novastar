import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Read5359RegAddress(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dataLength: number
    ): Promise<Buffer>;
    tryRead5359RegAddress(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dataLength: number
    ): Promise<Packet | null>;
  }
}
export default function createRead5359RegAddress(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dataLength: number
): Request {
  const req = new Request(dataLength, 'Read5359RegAddress');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Register5359Addres;
  return req;
}
Session.prototype.Read5359RegAddress = async function Read5359RegAddress(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dataLength: number
): Promise<Buffer> {
  const req = createRead5359RegAddress(addr, portAddr, scanBoardAddr, dataLength);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryRead5359RegAddress = async function tryRead5359RegAddress(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dataLength: number
): Promise<Packet | null> {
  const req = createRead5359RegAddress(addr, portAddr, scanBoardAddr, dataLength);
  return this.connection.trySend(req);
};
