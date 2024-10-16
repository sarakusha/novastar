import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDriverFucntion(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadDriverFucntion(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadDriverFucntion(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.DriverFucntionOccupancy, 'ReadDriverFucntion');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DriverFucntionAddr;
  return req;
}
Session.prototype.ReadDriverFucntion = async function ReadDriverFucntion(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadDriverFucntion(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDriverFucntion = async function tryReadDriverFucntion(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadDriverFucntion(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
