import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_RedundantStateOver32SpaceAllData(addr: number): Promise<Buffer>;
    tryReadSender_RedundantStateOver32SpaceAllData(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_RedundantStateOver32SpaceAllData(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_AllData32SpaceOccupancy,
    'ReadSender_RedundantStateOver32SpaceAllData'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_All32DataAddr;
  return req;
}
Session.prototype.ReadSender_RedundantStateOver32SpaceAllData =
  async function ReadSender_RedundantStateOver32SpaceAllData(
    this: Session,
    addr: number
  ): Promise<Buffer> {
    const req = createReadSender_RedundantStateOver32SpaceAllData(addr);
    return (await this.connection.send(req)).data;
  };
Session.prototype.tryReadSender_RedundantStateOver32SpaceAllData =
  async function tryReadSender_RedundantStateOver32SpaceAllData(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_RedundantStateOver32SpaceAllData(addr);
    return this.connection.trySend(req);
  };
