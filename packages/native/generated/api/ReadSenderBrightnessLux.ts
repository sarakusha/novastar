import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSenderBrightnessLux(addr: number): Promise<number>;
    tryReadSenderBrightnessLux(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSenderBrightnessLux(addr: number): Request {
  const req = new Request(AddressMapping.BrightnessOccupancy, 'ReadSenderBrightnessLux');
  req.destination = addr;
  req.address = AddressMapping.BrightnessAddr;
  return req;
}
Session.prototype.ReadSenderBrightnessLux = async function ReadSenderBrightnessLux(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSenderBrightnessLux(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSenderBrightnessLux = async function tryReadSenderBrightnessLux(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSenderBrightnessLux(addr);
  return this.connection.trySend(req);
};
