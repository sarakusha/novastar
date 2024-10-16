import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadTotalLightCdfRes(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadTotalLightCdfRes(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadTotalLightCdfRes(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.TotalLightCdfResOccupancy, 'ReadTotalLightCdfRes');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.TotalLightCdfResAddr;
  return req;
}
Session.prototype.ReadTotalLightCdfRes = async function ReadTotalLightCdfRes(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadTotalLightCdfRes(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadTotalLightCdfRes = async function tryReadTotalLightCdfRes(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadTotalLightCdfRes(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
