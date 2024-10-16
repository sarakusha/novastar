import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_OpticalWorkMode(addr: number): Promise<number>;
    tryReadSender_OpticalWorkMode(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_OpticalWorkMode(addr: number): Request {
  const req = new Request(AddressMapping.OpticalWorkModeOccupancy, 'ReadSender_OpticalWorkMode');
  req.destination = addr;
  req.address = AddressMapping.OpticalWorkModeAddr;
  return req;
}
Session.prototype.ReadSender_OpticalWorkMode = async function ReadSender_OpticalWorkMode(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_OpticalWorkMode(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_OpticalWorkMode = async function tryReadSender_OpticalWorkMode(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_OpticalWorkMode(addr);
  return this.connection.trySend(req);
};
