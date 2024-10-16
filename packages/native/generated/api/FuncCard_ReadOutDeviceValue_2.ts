import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadOutDeviceValue_2(addr: number, dataLength: number): Promise<Buffer>;
    tryFuncCard_ReadOutDeviceValue_2(addr: number, dataLength: number): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadOutDeviceValue_2(
  addr: number,
  dataLength: number
): Request {
  const req = new Request(dataLength, 'FuncCard_ReadOutDeviceValue_2');
  req.destination = addr;
  req.address = AddressMapping.FuncCard_ReadOutDeviceAddr;
  return req;
}
Session.prototype.FuncCard_ReadOutDeviceValue_2 = async function FuncCard_ReadOutDeviceValue_2(
  this: Session,
  addr: number,
  dataLength: number
): Promise<Buffer> {
  const req = createFuncCard_ReadOutDeviceValue_2(addr, dataLength);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryFuncCard_ReadOutDeviceValue_2 =
  async function tryFuncCard_ReadOutDeviceValue_2(
    this: Session,
    addr: number,
    dataLength: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadOutDeviceValue_2(addr, dataLength);
    return this.connection.trySend(req);
  };
