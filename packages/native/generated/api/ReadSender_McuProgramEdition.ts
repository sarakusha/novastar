import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_McuProgramEdition(addr: number): Promise<number>;
    tryReadSender_McuProgramEdition(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_McuProgramEdition(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_McuProgramEditionOccupancy,
    'ReadSender_McuProgramEdition'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_McuProgramEditionAddr;
  return req;
}
Session.prototype.ReadSender_McuProgramEdition = async function ReadSender_McuProgramEdition(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_McuProgramEdition(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_McuProgramEdition = async function tryReadSender_McuProgramEdition(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_McuProgramEdition(addr);
  return this.connection.trySend(req);
};
