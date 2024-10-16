import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetModuleConfigInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetModuleConfigInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetModuleConfigInfo<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(data, bBroadcast, 'SetModuleConfigInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ModuleConfigInfoAddr;
  return req;
}
Session.prototype.SetModuleConfigInfo = async function SetModuleConfigInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createSetModuleConfigInfo(addr, portAddr, scanBoardAddr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetModuleConfigInfo = async function trySetModuleConfigInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  data: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetModuleConfigInfo(addr, portAddr, scanBoardAddr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
