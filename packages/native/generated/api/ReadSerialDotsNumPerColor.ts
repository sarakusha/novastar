import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSerialDotsNumPerColor(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadSerialDotsNumPerColor(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadSerialDotsNumPerColor(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.SerialDotsNumPerColorOccupancy,
    'ReadSerialDotsNumPerColor'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SerialDotsNumPerColorAddr;
  return req;
}
Session.prototype.ReadSerialDotsNumPerColor = async function ReadSerialDotsNumPerColor(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadSerialDotsNumPerColor(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSerialDotsNumPerColor = async function tryReadSerialDotsNumPerColor(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadSerialDotsNumPerColor(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
