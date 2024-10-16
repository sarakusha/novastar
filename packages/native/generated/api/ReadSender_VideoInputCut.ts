import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_VideoInputCut(addr: number): Promise<Buffer>;
    tryReadSender_VideoInputCut(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_VideoInputCut(addr: number): Request {
  const req = new Request(AddressMapping.Sender_VideoInputCutOccupancy, 'ReadSender_VideoInputCut');
  req.destination = addr;
  req.address = AddressMapping.Sender_VideoInputCutAddr;
  return req;
}
Session.prototype.ReadSender_VideoInputCut = async function ReadSender_VideoInputCut(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSender_VideoInputCut(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_VideoInputCut = async function tryReadSender_VideoInputCut(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_VideoInputCut(addr);
  return this.connection.trySend(req);
};
