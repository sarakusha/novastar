import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_FPGAProgramLength(addr: number): Promise<number>;
    tryReadSender_FPGAProgramLength(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_FPGAProgramLength(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_FPGAProgramLengthOccupancy,
    'ReadSender_FPGAProgramLength'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_FPGAProgramLengthAddr;
  return req;
}
Session.prototype.ReadSender_FPGAProgramLength = async function ReadSender_FPGAProgramLength(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_FPGAProgramLength(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_FPGAProgramLength = async function tryReadSender_FPGAProgramLength(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_FPGAProgramLength(addr);
  return this.connection.trySend(req);
};
