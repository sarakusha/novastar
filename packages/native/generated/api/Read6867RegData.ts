import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Read6867RegData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dataLength: number
    ): Promise<Buffer>;
    tryRead6867RegData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dataLength: number
    ): Promise<Packet | null>;
  }
}
export default function createRead6867RegData(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dataLength: number
): Request {
  const req = new Request(dataLength, 'Read6867RegData');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Register6867RegAddress;
  return req;
}
Session.prototype.Read6867RegData = async function Read6867RegData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dataLength: number
): Promise<Buffer> {
  const req = createRead6867RegData(addr, portAddr, scanBoardAddr, dataLength);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryRead6867RegData = async function tryRead6867RegData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dataLength: number
): Promise<Packet | null> {
  const req = createRead6867RegData(addr, portAddr, scanBoardAddr, dataLength);
  return this.connection.trySend(req);
};
