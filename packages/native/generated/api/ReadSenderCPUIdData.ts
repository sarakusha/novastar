import { Packet, Request, Session } from '@novastar/codec';

declare module '@novastar/codec' {
  interface API {
    ReadSenderCPUIdData(addr: number): Promise<Buffer>;
    tryReadSenderCPUIdData(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSenderCPUIdData(addr: number): Request {
  const req = new Request(12, 'ReadSenderCPUIdData');
  req.destination = addr;
  req.address = 32;
  return req;
}
Session.prototype.ReadSenderCPUIdData = async function ReadSenderCPUIdData(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSenderCPUIdData(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSenderCPUIdData = async function tryReadSenderCPUIdData(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSenderCPUIdData(addr);
  return this.connection.trySend(req);
};
