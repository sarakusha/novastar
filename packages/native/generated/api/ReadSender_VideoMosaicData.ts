import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_VideoMosaicData(addr: number): Promise<Buffer>;
    tryReadSender_VideoMosaicData(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_VideoMosaicData(addr: number): Request {
  const req = new Request(AddressMapping.Sender_VideoMosaicOccupancy, 'ReadSender_VideoMosaicData');
  req.destination = addr;
  req.address = AddressMapping.Sender_VideoMosaicAddr;
  return req;
}
Session.prototype.ReadSender_VideoMosaicData = async function ReadSender_VideoMosaicData(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSender_VideoMosaicData(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_VideoMosaicData = async function tryReadSender_VideoMosaicData(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_VideoMosaicData(addr);
  return this.connection.trySend(req);
};
