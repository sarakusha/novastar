import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadVirtualCaptureEnable(addr: number): Promise<number>;
    tryReadVirtualCaptureEnable(addr: number): Promise<Packet | null>;
  }
}
export default function createReadVirtualCaptureEnable(addr: number): Request {
  const req = new Request(AddressMapping.VirtualCaptureEnableOccupancy, 'ReadVirtualCaptureEnable');
  req.destination = addr;
  req.address = AddressMapping.VirtualCaptureEnableAddr;
  return req;
}
Session.prototype.ReadVirtualCaptureEnable = async function ReadVirtualCaptureEnable(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadVirtualCaptureEnable(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadVirtualCaptureEnable = async function tryReadVirtualCaptureEnable(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadVirtualCaptureEnable(addr);
  return this.connection.trySend(req);
};
