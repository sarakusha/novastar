import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadNewPortEnable(addr: number, index: number): Promise<number>;
    tryReadNewPortEnable(addr: number, index: number): Promise<Packet | null>;
  }
}
export default function createReadNewPortEnable(addr: number, index: number): Request {
  const req = new Request(AddressMapping.PortEnableOccupancy, 'ReadNewPortEnable');
  req.destination = addr;
  req.address =
    AddressMapping.PortEnableNextAddr +
    AddressMapping.PortOccupancy * (index - AddressMapping.NewPortOccupancy);
  return req;
}
Session.prototype.ReadNewPortEnable = async function ReadNewPortEnable(
  this: Session,
  addr: number,
  index: number
): Promise<number> {
  const req = createReadNewPortEnable(addr, index);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadNewPortEnable = async function tryReadNewPortEnable(
  this: Session,
  addr: number,
  index: number
): Promise<Packet | null> {
  const req = createReadNewPortEnable(addr, index);
  return this.connection.trySend(req);
};
