import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadVirtualSendDataEnable(addr: number): Promise<number>;
    tryReadVirtualSendDataEnable(addr: number): Promise<Packet | null>;
  }
}
export default function createReadVirtualSendDataEnable(addr: number): Request {
  const req = new Request(AddressMapping.VirtualSendEnableOccupancy, 'ReadVirtualSendDataEnable');
  req.destination = addr;
  req.address = AddressMapping.VirtualSendEnableAddr;
  return req;
}
Session.prototype.ReadVirtualSendDataEnable = async function ReadVirtualSendDataEnable(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadVirtualSendDataEnable(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadVirtualSendDataEnable = async function tryReadVirtualSendDataEnable(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadVirtualSendDataEnable(addr);
  return this.connection.trySend(req);
};
