import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_SoftwareSpace(addr: number, dataLength: number, addrOffset: number): Promise<Buffer>;
    tryReadSender_SoftwareSpace(
      addr: number,
      dataLength: number,
      addrOffset: number
    ): Promise<Packet | null>;
  }
}
export default function createReadSender_SoftwareSpace(
  addr: number,
  dataLength: number,
  addrOffset: number
): Request {
  const req = new Request(dataLength, 'ReadSender_SoftwareSpace');
  req.destination = addr;
  req.address = AddressMapping.Sender_SoftwareSpaceAddr + addrOffset;
  return req;
}
Session.prototype.ReadSender_SoftwareSpace = async function ReadSender_SoftwareSpace(
  this: Session,
  addr: number,
  dataLength: number,
  addrOffset: number
): Promise<Buffer> {
  const req = createReadSender_SoftwareSpace(addr, dataLength, addrOffset);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_SoftwareSpace = async function tryReadSender_SoftwareSpace(
  this: Session,
  addr: number,
  dataLength: number,
  addrOffset: number
): Promise<Packet | null> {
  const req = createReadSender_SoftwareSpace(addr, dataLength, addrOffset);
  return this.connection.trySend(req);
};
