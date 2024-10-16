import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadToneValue(addr: number): Promise<number>;
    tryReadToneValue(addr: number): Promise<Packet | null>;
  }
}
export default function createReadToneValue(addr: number): Request {
  const req = new Request(AddressMapping.SenderToneResultOccupancy, 'ReadToneValue');
  req.destination = addr;
  req.address = AddressMapping.SenderToneResultddr;
  return req;
}
Session.prototype.ReadToneValue = async function ReadToneValue(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadToneValue(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadToneValue = async function tryReadToneValue(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadToneValue(addr);
  return this.connection.trySend(req);
};
