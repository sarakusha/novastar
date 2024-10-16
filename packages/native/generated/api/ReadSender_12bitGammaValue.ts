import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_12bitGammaValue(addr: number): Promise<number>;
    tryReadSender_12bitGammaValue(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_12bitGammaValue(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_12bitGammaValueOccupancy,
    'ReadSender_12bitGammaValue'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_12bitGammaValueAddr;
  return req;
}
Session.prototype.ReadSender_12bitGammaValue = async function ReadSender_12bitGammaValue(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_12bitGammaValue(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_12bitGammaValue = async function tryReadSender_12bitGammaValue(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_12bitGammaValue(addr);
  return this.connection.trySend(req);
};
