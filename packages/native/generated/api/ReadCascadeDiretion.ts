import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadCascadeDiretion(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadCascadeDiretion(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadCascadeDiretion(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.CascadeDiretionOccupancy, 'ReadCascadeDiretion');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CascadeDiretionAddr;
  return req;
}
Session.prototype.ReadCascadeDiretion = async function ReadCascadeDiretion(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadCascadeDiretion(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadCascadeDiretion = async function tryReadCascadeDiretion(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadCascadeDiretion(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
