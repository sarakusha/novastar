import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_ReadHWAutoBright(addr: number): Promise<Buffer>;
    tryReadSender_ReadHWAutoBright(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_ReadHWAutoBright(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_HWAutoBrightOccupancy,
    'ReadSender_ReadHWAutoBright'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_HWAutoBrightAddr;
  return req;
}
Session.prototype.ReadSender_ReadHWAutoBright = async function ReadSender_ReadHWAutoBright(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSender_ReadHWAutoBright(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_ReadHWAutoBright = async function tryReadSender_ReadHWAutoBright(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_ReadHWAutoBright(addr);
  return this.connection.trySend(req);
};
