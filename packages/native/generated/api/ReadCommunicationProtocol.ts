import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadCommunicationProtocol(addr: number): Promise<number>;
    tryReadCommunicationProtocol(addr: number): Promise<Packet | null>;
  }
}
export default function createReadCommunicationProtocol(addr: number): Request {
  const req = new Request(
    AddressMapping.CommunicationProtocolOccupancy,
    'ReadCommunicationProtocol'
  );
  req.destination = addr;
  req.address = AddressMapping.CommunicationProtocolAddr;
  return req;
}
Session.prototype.ReadCommunicationProtocol = async function ReadCommunicationProtocol(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadCommunicationProtocol(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadCommunicationProtocol = async function tryReadCommunicationProtocol(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadCommunicationProtocol(addr);
  return this.connection.trySend(req);
};
