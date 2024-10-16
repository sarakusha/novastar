import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_HWProgramAllInfo(addr: number): Promise<Buffer>;
    tryReadSender_HWProgramAllInfo(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_HWProgramAllInfo(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_HWProgramAllInfoccupancy,
    'ReadSender_HWProgramAllInfo'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_HWProgramAllInfoAddr;
  return req;
}
Session.prototype.ReadSender_HWProgramAllInfo = async function ReadSender_HWProgramAllInfo(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSender_HWProgramAllInfo(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_HWProgramAllInfo = async function tryReadSender_HWProgramAllInfo(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_HWProgramAllInfo(addr);
  return this.connection.trySend(req);
};
