import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_ReadOutDeviceValue_3(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      dataLength: number
    ): Promise<Buffer>;
    tryFuncCard_ReadOutDeviceValue_3(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      dataLength: number
    ): Promise<Packet | null>;
  }
}
export default function createFuncCard_ReadOutDeviceValue_3(
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  dataLength: number
): Request {
  const req = new Request(dataLength, 'FuncCard_ReadOutDeviceValue_3');
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address = AddressMapping.FuncCard_ReadOutDeviceAddr;
  return req;
}
Session.prototype.FuncCard_ReadOutDeviceValue_3 = async function FuncCard_ReadOutDeviceValue_3(
  this: Session,
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  dataLength: number
): Promise<Buffer> {
  const req = createFuncCard_ReadOutDeviceValue_3(addr, portAddr, funcCardAddr, dataLength);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryFuncCard_ReadOutDeviceValue_3 =
  async function tryFuncCard_ReadOutDeviceValue_3(
    this: Session,
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    dataLength: number
  ): Promise<Packet | null> {
    const req = createFuncCard_ReadOutDeviceValue_3(addr, portAddr, funcCardAddr, dataLength);
    return this.connection.trySend(req);
  };
