import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetConfigRegisterWrite6(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetConfigRegisterWrite6(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetConfigRegisterWrite6<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  if (data.length !== AddressMapping.Config3RegisterOccupancy)
    throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, bBroadcast, 'SetConfigRegisterWrite6');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ConfigRegisterWriteAddr6;
  return req;
}
Session.prototype.SetConfigRegisterWrite6 = async function SetConfigRegisterWrite6(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createSetConfigRegisterWrite6(addr, portAddr, scanBoardAddr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetConfigRegisterWrite6 = async function trySetConfigRegisterWrite6(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  data: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetConfigRegisterWrite6(addr, portAddr, scanBoardAddr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
