import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ModuleOperCmd(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    tryModuleOperCmd(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createModuleOperCmd<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  if (data.length !== AddressMapping.ModuleOperCmdOccupancy)
    throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, bBroadcast, 'ModuleOperCmd');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ModuleOperCmdAddr;
  return req;
}
Session.prototype.ModuleOperCmd = async function ModuleOperCmd(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createModuleOperCmd(addr, portAddr, scanBoardAddr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.tryModuleOperCmd = async function tryModuleOperCmd(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  data: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createModuleOperCmd(addr, portAddr, scanBoardAddr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
