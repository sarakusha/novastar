import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadReturnFactoryValues(addr: number): Promise<number>;
    tryReadReturnFactoryValues(addr: number): Promise<Packet | null>;
  }
}
export default function createReadReturnFactoryValues(addr: number): Request {
  const req = new Request(AddressMapping.ReturnFactoryValuesOccupancy, 'ReadReturnFactoryValues');
  req.destination = addr;
  req.address = AddressMapping.ReturnFactoryValuesAddr;
  return req;
}
Session.prototype.ReadReturnFactoryValues = async function ReadReturnFactoryValues(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadReturnFactoryValues(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadReturnFactoryValues = async function tryReadReturnFactoryValues(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadReturnFactoryValues(addr);
  return this.connection.trySend(req);
};
