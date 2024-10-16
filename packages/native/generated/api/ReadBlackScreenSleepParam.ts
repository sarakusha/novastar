import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadBlackScreenSleepParam(addr: number): Promise<number>;
    tryReadBlackScreenSleepParam(addr: number): Promise<Packet | null>;
  }
}
export default function createReadBlackScreenSleepParam(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_BlackScreenSleepLength,
    'ReadBlackScreenSleepParam'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_BlackScreenSleepAddr;
  return req;
}
Session.prototype.ReadBlackScreenSleepParam = async function ReadBlackScreenSleepParam(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadBlackScreenSleepParam(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadBlackScreenSleepParam = async function tryReadBlackScreenSleepParam(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadBlackScreenSleepParam(addr);
  return this.connection.trySend(req);
};
