import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_HWScreenDisplayFlag(addr: number): Promise<number>;
    tryReadSender_HWScreenDisplayFlag(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_HWScreenDisplayFlag(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_HWScreenDisplayFlagOccupancy,
    'ReadSender_HWScreenDisplayFlag'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_HWScreenDisplayBaseAddr;
  return req;
}
Session.prototype.ReadSender_HWScreenDisplayFlag = async function ReadSender_HWScreenDisplayFlag(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_HWScreenDisplayFlag(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_HWScreenDisplayFlag =
  async function tryReadSender_HWScreenDisplayFlag(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_HWScreenDisplayFlag(addr);
    return this.connection.trySend(req);
  };
