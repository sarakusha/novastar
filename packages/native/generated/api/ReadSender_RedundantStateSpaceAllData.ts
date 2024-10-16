import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_RedundantStateSpaceAllData(addr: number): Promise<Buffer>;
    tryReadSender_RedundantStateSpaceAllData(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_RedundantStateSpaceAllData(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_AllDataSpaceOccupancy,
    'ReadSender_RedundantStateSpaceAllData'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_AllDataAddr;
  return req;
}
Session.prototype.ReadSender_RedundantStateSpaceAllData =
  async function ReadSender_RedundantStateSpaceAllData(
    this: Session,
    addr: number
  ): Promise<Buffer> {
    const req = createReadSender_RedundantStateSpaceAllData(addr);
    return (await this.connection.send(req)).data;
  };
Session.prototype.tryReadSender_RedundantStateSpaceAllData =
  async function tryReadSender_RedundantStateSpaceAllData(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_RedundantStateSpaceAllData(addr);
    return this.connection.trySend(req);
  };
