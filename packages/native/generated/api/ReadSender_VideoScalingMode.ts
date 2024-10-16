import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_VideoScalingMode(addr: number): Promise<number>;
    tryReadSender_VideoScalingMode(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_VideoScalingMode(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_VideoScalingModeOccupancy,
    'ReadSender_VideoScalingMode'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_VideoScalingModeAddr;
  return req;
}
Session.prototype.ReadSender_VideoScalingMode = async function ReadSender_VideoScalingMode(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_VideoScalingMode(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_VideoScalingMode = async function tryReadSender_VideoScalingMode(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSender_VideoScalingMode(addr);
  return this.connection.trySend(req);
};
