import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Read5pinControlLight(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryRead5pinControlLight(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createRead5pinControlLight(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ControlLightOccupancy, 'Read5pinControlLight');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ControlLightAddr;
  return req;
}
Session.prototype.Read5pinControlLight = async function Read5pinControlLight(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createRead5pinControlLight(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryRead5pinControlLight = async function tryRead5pinControlLight(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createRead5pinControlLight(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
