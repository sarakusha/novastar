import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_10bitGammaValue(addr: number): Promise<number>;
    tryReadSender_10bitGammaValue(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_10bitGammaValue(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_10bitGammaValueOccupancy,
    'ReadSender_10bitGammaValue'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_10bitGammaValueAddr;
  return req;
}
Session.prototype.ReadSender_10bitGammaValue = async function ReadSender_10bitGammaValue(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_10bitGammaValue(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_10bitGammaValue = async function tryReadSender_10bitGammaValue(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_10bitGammaValue(addr);
  return this.connection.trySend(req);
};
