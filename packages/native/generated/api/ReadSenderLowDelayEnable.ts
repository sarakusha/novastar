import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSenderLowDelayEnable(addr: number): Promise<number>;
    tryReadSenderLowDelayEnable(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSenderLowDelayEnable(addr: number): Request {
  const req = new Request(AddressMapping.LowDelayOccupancy, 'ReadSenderLowDelayEnable');
  req.destination = addr;
  req.address = AddressMapping.LowDelayAddr;
  return req;
}
Session.prototype.ReadSenderLowDelayEnable = async function ReadSenderLowDelayEnable(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSenderLowDelayEnable(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSenderLowDelayEnable = async function tryReadSenderLowDelayEnable(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSenderLowDelayEnable(addr);
  return this.connection.trySend(req);
};
