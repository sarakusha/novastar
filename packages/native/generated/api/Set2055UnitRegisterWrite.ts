import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Set2055UnitRegisterWrite(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number[] | Buffer,
      unit: number
    ): Promise<void>;
    trySet2055UnitRegisterWrite(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number[] | Buffer,
      unit: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSet2055UnitRegisterWrite<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer,
  unit: number
): Request<Broadcast> {
  if (data.length !== AddressMapping.Config2055UnitRegisterOccupancy)
    throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, bBroadcast, 'Set2055UnitRegisterWrite');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Config2055RegisterAddr + unit * 8;
  return req;
}
Session.prototype.Set2055UnitRegisterWrite = async function Set2055UnitRegisterWrite(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  data: number[] | Buffer,
  unit: number
): Promise<void> {
  const req = createSet2055UnitRegisterWrite(addr, portAddr, scanBoardAddr, bBroadcast, data, unit);
  await this.connection.send(req);
};
Session.prototype.trySet2055UnitRegisterWrite = async function trySet2055UnitRegisterWrite(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  data: number[] | Buffer,
  unit: number
): Promise<ErrorType | null> {
  const req = createSet2055UnitRegisterWrite(addr, portAddr, scanBoardAddr, false, data, unit);
  return (await this.connection.trySend(req))?.ack ?? null;
};
