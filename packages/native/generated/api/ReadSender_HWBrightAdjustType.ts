import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_HWBrightAdjustType(addr: number): Promise<number>;
    tryReadSender_HWBrightAdjustType(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_HWBrightAdjustType(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_HWBrightAdjustTypeOccupancy,
    'ReadSender_HWBrightAdjustType'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_HWBrightAdjustTypeAddr;
  return req;
}
Session.prototype.ReadSender_HWBrightAdjustType = async function ReadSender_HWBrightAdjustType(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_HWBrightAdjustType(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_HWBrightAdjustType =
  async function tryReadSender_HWBrightAdjustType(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_HWBrightAdjustType(addr);
    return this.connection.trySend(req);
  };
