import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_DVIResolutionHeight(addr: number): Promise<number>;
    tryReadSender_DVIResolutionHeight(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_DVIResolutionHeight(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_DVIHeightOccupancy,
    'ReadSender_DVIResolutionHeight'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_DVIHeightAddr;
  return req;
}
Session.prototype.ReadSender_DVIResolutionHeight = async function ReadSender_DVIResolutionHeight(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_DVIResolutionHeight(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_DVIResolutionHeight =
  async function tryReadSender_DVIResolutionHeight(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_DVIResolutionHeight(addr);
    return this.connection.trySend(req);
  };
