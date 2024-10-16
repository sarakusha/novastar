import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_DistributePortSeting(addr: number): Promise<number>;
    tryReadSender_DistributePortSeting(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_DistributePortSeting(addr: number): Request {
  const req = new Request(
    AddressMapping.DistributePortSetingAddrOccupancy,
    'ReadSender_DistributePortSeting'
  );
  req.destination = addr;
  req.address = AddressMapping.DistributePortSetingAddr;
  return req;
}
Session.prototype.ReadSender_DistributePortSeting = async function ReadSender_DistributePortSeting(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_DistributePortSeting(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_DistributePortSeting =
  async function tryReadSender_DistributePortSeting(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_DistributePortSeting(addr);
    return this.connection.trySend(req);
  };
