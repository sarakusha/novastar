import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetIoControl(addr: number, bBroadcast: boolean, ioControl: number): Promise<void>;
    trySetIoControl(addr: number, ioControl: number): Promise<ErrorType | null>;
  }
}
export default function createSetIoControl<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  ioControl: number
): Request<Broadcast> {
  const $data = encodeUIntLE(ioControl, AddressMapping.IoControlOccupancy);
  const req = new Request($data, bBroadcast, 'SetIoControl');
  req.destination = addr;
  req.address = AddressMapping.IoControlAddr;
  return req;
}
Session.prototype.SetIoControl = async function SetIoControl(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  ioControl: number
): Promise<void> {
  const req = createSetIoControl(addr, bBroadcast, ioControl);
  await this.connection.send(req);
};
Session.prototype.trySetIoControl = async function trySetIoControl(
  this: Session,
  addr: number,
  ioControl: number
): Promise<ErrorType | null> {
  const req = createSetIoControl(addr, false, ioControl);
  return (await this.connection.trySend(req))?.ack ?? null;
};
