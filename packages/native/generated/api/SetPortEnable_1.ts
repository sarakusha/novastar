import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetPortEnable_1(
      addr: number,
      bBroadcast: boolean,
      portEnable: number[] | Buffer,
      portIndex: number
    ): Promise<void>;
    trySetPortEnable_1(
      addr: number,
      portEnable: number[] | Buffer,
      portIndex: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetPortEnable_1<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  portEnable: number[] | Buffer,
  portIndex: number
): Request<Broadcast> {
  if (portEnable.length !== AddressMapping.MasterOrSlaveSetOccupancy)
    throw new TypeError(`Invalid buffer size: ${portEnable.length}`);
  const req = new Request(portEnable, bBroadcast, 'SetPortEnable_1');
  req.destination = addr;
  req.address = AddressMapping.PortEnableAddr;
  return req;
}
Session.prototype.SetPortEnable_1 = async function SetPortEnable_1(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  portEnable: number[] | Buffer,
  portIndex: number
): Promise<void> {
  const req = createSetPortEnable_1(addr, bBroadcast, portEnable, portIndex);
  await this.connection.send(req);
};
Session.prototype.trySetPortEnable_1 = async function trySetPortEnable_1(
  this: Session,
  addr: number,
  portEnable: number[] | Buffer,
  portIndex: number
): Promise<ErrorType | null> {
  const req = createSetPortEnable_1(addr, false, portEnable, portIndex);
  return (await this.connection.trySend(req))?.ack ?? null;
};
