import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_EnableAndSegementOfHWPro(addr: number): Promise<Buffer>;
    tryReadSender_EnableAndSegementOfHWPro(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_EnableAndSegementOfHWPro(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_EnableAndSegemntOccupancy,
    'ReadSender_EnableAndSegementOfHWPro'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_EnableAndSegemntAddr;
  return req;
}
Session.prototype.ReadSender_EnableAndSegementOfHWPro =
  async function ReadSender_EnableAndSegementOfHWPro(this: Session, addr: number): Promise<Buffer> {
    const req = createReadSender_EnableAndSegementOfHWPro(addr);
    return (await this.connection.send(req)).data;
  };
Session.prototype.tryReadSender_EnableAndSegementOfHWPro =
  async function tryReadSender_EnableAndSegementOfHWPro(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_EnableAndSegementOfHWPro(addr);
    return this.connection.trySend(req);
  };