import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadOutDeviceValue(addr: number): Promise<Buffer>;
    tryFuncCard_ReadOutDeviceValue(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadOutDeviceValue(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_ReadOutDeviceOccupancy,
    'FuncCard_ReadOutDeviceValue'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_ReadOutDeviceAddr;
  return req;
}
Session.prototype.FuncCard_ReadOutDeviceValue = async function FuncCard_ReadOutDeviceValue(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createFuncCard_ReadOutDeviceValue(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryFuncCard_ReadOutDeviceValue = async function tryFuncCard_ReadOutDeviceValue(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createFuncCard_ReadOutDeviceValue(addr);
  return this.connection.trySend(req);
};
