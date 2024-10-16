import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadConfigRegiste3rRead(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadConfigRegiste3rRead(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadConfigRegiste3rRead(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.Config3RegisterOccupancy, 'ReadConfigRegiste3rRead');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Config3RegisterWriteAddr;
  return req;
}
Session.prototype.ReadConfigRegiste3rRead = async function ReadConfigRegiste3rRead(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadConfigRegiste3rRead(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadConfigRegiste3rRead = async function tryReadConfigRegiste3rRead(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadConfigRegiste3rRead(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
