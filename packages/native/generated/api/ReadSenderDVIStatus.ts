import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';

declare module '@novastar/codec' {
  interface API {
    ReadSenderDVIStatus(addr: number): Promise<number>;
    tryReadSenderDVIStatus(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSenderDVIStatus(addr: number): Request {
  const req = new Request(1, 'ReadSenderDVIStatus');
  req.destination = addr;
  req.address = 33554455;
  return req;
}
Session.prototype.ReadSenderDVIStatus = async function ReadSenderDVIStatus(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSenderDVIStatus(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSenderDVIStatus = async function tryReadSenderDVIStatus(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSenderDVIStatus(addr);
  return this.connection.trySend(req);
};
