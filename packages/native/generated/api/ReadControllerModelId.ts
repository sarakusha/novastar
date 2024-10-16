import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadControllerModelId(addr: number): Promise<number>;
    tryReadControllerModelId(addr: number): Promise<Packet | null>;
  }
}
export default function createReadControllerModelId(addr: number): Request {
  const req = new Request(AddressMapping.ControllerModelIdOccupancy, 'ReadControllerModelId');
  req.destination = addr;
  req.address = AddressMapping.ControllerModelIdAddr;
  return req;
}
Session.prototype.ReadControllerModelId = async function ReadControllerModelId(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadControllerModelId(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadControllerModelId = async function tryReadControllerModelId(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadControllerModelId(addr);
  return this.connection.trySend(req);
};
