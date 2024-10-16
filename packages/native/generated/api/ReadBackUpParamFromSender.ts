import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadBackUpParamFromSender(addr: number, length: number): Promise<Buffer>;
    tryReadBackUpParamFromSender(addr: number, length: number): Promise<Packet | null>;
  }
}
export default function createReadBackUpParamFromSender(addr: number, length: number): Request {
  const req = new Request(length, 'ReadBackUpParamFromSender');
  req.destination = addr;
  req.address = AddressMapping.BackUpFileAddr;
  return req;
}
Session.prototype.ReadBackUpParamFromSender = async function ReadBackUpParamFromSender(
  this: Session,
  addr: number,
  length: number
): Promise<Buffer> {
  const req = createReadBackUpParamFromSender(addr, length);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadBackUpParamFromSender = async function tryReadBackUpParamFromSender(
  this: Session,
  addr: number,
  length: number
): Promise<Packet | null> {
  const req = createReadBackUpParamFromSender(addr, length);
  return this.connection.trySend(req);
};
