import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    GetGrayCoefficientEN(Sender: number, portAddr: number, Scan: number): Promise<number>;
    tryGetGrayCoefficientEN(Sender: number, portAddr: number, Scan: number): Promise<Packet | null>;
  }
}
export default function createGetGrayCoefficientEN(
  Sender: number,
  portAddr: number,
  Scan: number
): Request {
  const req = new Request(AddressMapping.GrayCoefficientENAddrOccupancy, 'GetGrayCoefficientEN');
  req.destination = Sender;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = Scan;
  req.address = AddressMapping.GrayCoefficientENAddr;
  return req;
}
Session.prototype.GetGrayCoefficientEN = async function GetGrayCoefficientEN(
  this: Session,
  Sender: number,
  portAddr: number,
  Scan: number
): Promise<number> {
  const req = createGetGrayCoefficientEN(Sender, portAddr, Scan);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryGetGrayCoefficientEN = async function tryGetGrayCoefficientEN(
  this: Session,
  Sender: number,
  portAddr: number,
  Scan: number
): Promise<Packet | null> {
  const req = createGetGrayCoefficientEN(Sender, portAddr, Scan);
  return this.connection.trySend(req);
};
