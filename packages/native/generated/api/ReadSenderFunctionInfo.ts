import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSenderFunctionInfo(addr: number): Promise<Buffer>;
    tryReadSenderFunctionInfo(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSenderFunctionInfo(addr: number): Request {
  const req = new Request(AddressMapping.SenderFunctionOccupancy, 'ReadSenderFunctionInfo');
  req.destination = addr;
  req.address = AddressMapping.SenderFunctionAddr;
  return req;
}
Session.prototype.ReadSenderFunctionInfo = async function ReadSenderFunctionInfo(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSenderFunctionInfo(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSenderFunctionInfo = async function tryReadSenderFunctionInfo(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSenderFunctionInfo(addr);
  return this.connection.trySend(req);
};
