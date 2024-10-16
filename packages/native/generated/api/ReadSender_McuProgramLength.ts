import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_McuProgramLength(addr: number): Promise<number>;
    tryReadSender_McuProgramLength(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_McuProgramLength(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_McuProgramLengthOccupancy,
    'ReadSender_McuProgramLength'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_McuProgramLengthAddr;
  return req;
}
Session.prototype.ReadSender_McuProgramLength = async function ReadSender_McuProgramLength(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_McuProgramLength(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_McuProgramLength = async function tryReadSender_McuProgramLength(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_McuProgramLength(addr);
  return this.connection.trySend(req);
};
