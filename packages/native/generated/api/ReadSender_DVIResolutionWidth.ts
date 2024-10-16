import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_DVIResolutionWidth(addr: number): Promise<number>;
    tryReadSender_DVIResolutionWidth(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_DVIResolutionWidth(addr: number): Request {
  const req = new Request(AddressMapping.Sender_DVIWidthOccupancy, 'ReadSender_DVIResolutionWidth');
  req.destination = addr;
  req.address = AddressMapping.Sender_DVIWidthAddr;
  return req;
}
Session.prototype.ReadSender_DVIResolutionWidth = async function ReadSender_DVIResolutionWidth(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_DVIResolutionWidth(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_DVIResolutionWidth =
  async function tryReadSender_DVIResolutionWidth(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_DVIResolutionWidth(addr);
    return this.connection.trySend(req);
  };
