import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetNewPortEnable(
      addr: number,
      bBroadcast: boolean,
      portEnable: number,
      index: number
    ): Promise<void>;
    trySetNewPortEnable(addr: number, portEnable: number, index: number): Promise<ErrorType | null>;
  }
}
export default function createSetNewPortEnable<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  portEnable: number,
  index: number
): Request<Broadcast> {
  const $data = encodeUIntLE(portEnable, AddressMapping.PortEnableOccupancy);
  const req = new Request($data, bBroadcast, 'SetNewPortEnable');
  req.destination = addr;
  req.address =
    AddressMapping.PortEnableNextAddr +
    AddressMapping.PortOccupancy * (index - AddressMapping.NewPortOccupancy);
  return req;
}
Session.prototype.SetNewPortEnable = async function SetNewPortEnable(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  portEnable: number,
  index: number
): Promise<void> {
  const req = createSetNewPortEnable(addr, bBroadcast, portEnable, index);
  await this.connection.send(req);
};
Session.prototype.trySetNewPortEnable = async function trySetNewPortEnable(
  this: Session,
  addr: number,
  portEnable: number,
  index: number
): Promise<ErrorType | null> {
  const req = createSetNewPortEnable(addr, false, portEnable, index);
  return (await this.connection.trySend(req))?.ack ?? null;
};
