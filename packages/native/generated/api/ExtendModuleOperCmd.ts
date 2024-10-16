import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ExtendModuleOperCmd(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number[] | Buffer,
      length: number
    ): Promise<void>;
    tryExtendModuleOperCmd(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number[] | Buffer,
      length: number
    ): Promise<ErrorType | null>;
  }
}
export default function createExtendModuleOperCmd<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer,
  length: number
): Request<Broadcast> {
  if (data.length !== length) throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, bBroadcast, 'ExtendModuleOperCmd');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ModuleOperCmdAddr;
  return req;
}
Session.prototype.ExtendModuleOperCmd = async function ExtendModuleOperCmd(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  data: number[] | Buffer,
  length: number
): Promise<void> {
  const req = createExtendModuleOperCmd(addr, portAddr, scanBoardAddr, bBroadcast, data, length);
  await this.connection.send(req);
};
Session.prototype.tryExtendModuleOperCmd = async function tryExtendModuleOperCmd(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  data: number[] | Buffer,
  length: number
): Promise<ErrorType | null> {
  const req = createExtendModuleOperCmd(addr, portAddr, scanBoardAddr, false, data, length);
  return (await this.connection.trySend(req))?.ack ?? null;
};
