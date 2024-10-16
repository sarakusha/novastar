import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_EnableSyncAndTotalData(addr: number): Promise<Buffer>;
    tryReadSender_EnableSyncAndTotalData(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_EnableSyncAndTotalData(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_EnableSyncAndTotalDataOccupancy,
    'ReadSender_EnableSyncAndTotalData'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_EnableSyncAndTotalDataAddr;
  return req;
}
Session.prototype.ReadSender_EnableSyncAndTotalData =
  async function ReadSender_EnableSyncAndTotalData(this: Session, addr: number): Promise<Buffer> {
    const req = createReadSender_EnableSyncAndTotalData(addr);
    return (await this.connection.send(req)).data;
  };
Session.prototype.tryReadSender_EnableSyncAndTotalData =
  async function tryReadSender_EnableSyncAndTotalData(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_EnableSyncAndTotalData(addr);
    return this.connection.trySend(req);
  };
