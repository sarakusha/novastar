import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Read2200RegisterData(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryRead2200RegisterData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createRead2200RegisterData(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.WriteConfigRegisterOccupancyFor2200,
    'Read2200RegisterData'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.WriteConfigRegisterAddrFor2200;
  return req;
}
Session.prototype.Read2200RegisterData = async function Read2200RegisterData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createRead2200RegisterData(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryRead2200RegisterData = async function tryRead2200RegisterData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createRead2200RegisterData(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
