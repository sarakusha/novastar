import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_FPGAProgramRemarks(addr: number): Promise<Buffer>;
    tryReadSender_FPGAProgramRemarks(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_FPGAProgramRemarks(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_FPGAProgramRemarksOccupancy,
    'ReadSender_FPGAProgramRemarks'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_FPGAProgramRemarksAddr;
  return req;
}
Session.prototype.ReadSender_FPGAProgramRemarks = async function ReadSender_FPGAProgramRemarks(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadSender_FPGAProgramRemarks(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_FPGAProgramRemarks =
  async function tryReadSender_FPGAProgramRemarks(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_FPGAProgramRemarks(addr);
    return this.connection.trySend(req);
  };
