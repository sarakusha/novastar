import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_EnableGainOfHWPro(addr: number): Promise<number>;
    tryReadSender_EnableGainOfHWPro(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_EnableGainOfHWPro(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_EnableGainOccupancy,
    'ReadSender_EnableGainOfHWPro'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_EnableGainAddr;
  return req;
}
Session.prototype.ReadSender_EnableGainOfHWPro = async function ReadSender_EnableGainOfHWPro(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_EnableGainOfHWPro(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_EnableGainOfHWPro = async function tryReadSender_EnableGainOfHWPro(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_EnableGainOfHWPro(addr);
  return this.connection.trySend(req);
};
