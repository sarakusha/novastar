import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_Enable3DStateSpace(addr: number): Promise<number>;
    tryReadSender_Enable3DStateSpace(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_Enable3DStateSpace(addr: number): Request {
  const req = new Request(AddressMapping.Enable3DOccupancy, 'ReadSender_Enable3DStateSpace');
  req.destination = addr;
  req.address = AddressMapping.Enable3DAddr;
  return req;
}
Session.prototype.ReadSender_Enable3DStateSpace = async function ReadSender_Enable3DStateSpace(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_Enable3DStateSpace(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_Enable3DStateSpace =
  async function tryReadSender_Enable3DStateSpace(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_Enable3DStateSpace(addr);
    return this.connection.trySend(req);
  };
