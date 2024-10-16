import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSubField(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadSubField(addr: number, portAddr: number, scanBoardAddr: number): Promise<Packet | null>;
  }
}
export default function createReadSubField(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.PartNumPerRefOccupancy +
      AddressMapping.SubFieldNum * AddressMapping.SubFieldOccupancy,
    'ReadSubField'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.PartNumPerRefAddr;
  return req;
}
Session.prototype.ReadSubField = async function ReadSubField(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadSubField(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSubField = async function tryReadSubField(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadSubField(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
