import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    FuncCard_SetFPGAData(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      bBroadcast: boolean,
      data: number[] | Buffer,
      offset: number
    ): Promise<void>;
    tryFuncCard_SetFPGAData(
      addr: number,
      portAddr: number,
      funcCardAddr: number,
      data: number[] | Buffer,
      offset: number
    ): Promise<ErrorType | null>;
  }
}
export default function createFuncCard_SetFPGAData<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer,
  offset: number
): Request<Broadcast> {
  const req = new Request(data, bBroadcast, 'FuncCard_SetFPGAData');
  req.destination = addr;
  req.deviceType = 2;
  req.port = portAddr;
  req.rcvIndex = funcCardAddr;
  req.address = AddressMapping.FuncCard_FPGALengthAddr + offset;
  return req;
}
Session.prototype.FuncCard_SetFPGAData = async function FuncCard_SetFPGAData(
  this: Session,
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  bBroadcast: boolean,
  data: number[] | Buffer,
  offset: number
): Promise<void> {
  const req = createFuncCard_SetFPGAData(addr, portAddr, funcCardAddr, bBroadcast, data, offset);
  await this.connection.send(req);
};
Session.prototype.tryFuncCard_SetFPGAData = async function tryFuncCard_SetFPGAData(
  this: Session,
  addr: number,
  portAddr: number,
  funcCardAddr: number,
  data: number[] | Buffer,
  offset: number
): Promise<ErrorType | null> {
  const req = createFuncCard_SetFPGAData(addr, portAddr, funcCardAddr, false, data, offset);
  return (await this.connection.trySend(req))?.ack ?? null;
};
