import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadOutTAndHumValue(addr: number): Promise<Buffer>;
    tryFuncCard_ReadOutTAndHumValue(addr: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadOutTAndHumValue(addr: number): Request {
  const req = new Request(
    AddressMapping.FuncCard_ReadTemAndHumOccupancy,
    'FuncCard_ReadOutTAndHumValue'
  );
  req.destination = addr;
  req.address = AddressMapping.FuncCard_ReadOutDeviceAddr;
  return req;
}
Session.prototype.FuncCard_ReadOutTAndHumValue = async function FuncCard_ReadOutTAndHumValue(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createFuncCard_ReadOutTAndHumValue(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryFuncCard_ReadOutTAndHumValue = async function tryFuncCard_ReadOutTAndHumValue(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createFuncCard_ReadOutTAndHumValue(addr);
  return this.connection.trySend(req);
};
