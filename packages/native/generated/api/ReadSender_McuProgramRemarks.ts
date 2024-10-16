import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_McuProgramRemarks(addr: number): Promise<Buffer>;
    tryReadSender_McuProgramRemarks(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_McuProgramRemarks(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_McuProgramRemarksOccupancy,
    'ReadSender_McuProgramRemarks'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_McuProgramRemarksAddr;
  return req;
}
Session.prototype.ReadSender_McuProgramRemarks = async function ReadSender_McuProgramRemarks(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSender_McuProgramRemarks(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_McuProgramRemarks = async function tryReadSender_McuProgramRemarks(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_McuProgramRemarks(addr);
  return this.connection.trySend(req);
};
