import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_McuProgramInfo(addr: number): Promise<Buffer>;
    tryReadSender_McuProgramInfo(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_McuProgramInfo(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_McuProgramInfoOccupancy,
    'ReadSender_McuProgramInfo'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_McuProgramInfoAddr;
  return req;
}
Session.prototype.ReadSender_McuProgramInfo = async function ReadSender_McuProgramInfo(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSender_McuProgramInfo(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_McuProgramInfo = async function tryReadSender_McuProgramInfo(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_McuProgramInfo(addr);
  return this.connection.trySend(req);
};
