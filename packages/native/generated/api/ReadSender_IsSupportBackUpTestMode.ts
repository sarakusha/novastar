import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_IsSupportBackUpTestMode(addr: number): Promise<number>;
    tryReadSender_IsSupportBackUpTestMode(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_IsSupportBackUpTestMode(addr: number): Request {
  const req = new Request(
    AddressMapping.IsSupportBackUpTestModeOccupancy,
    'ReadSender_IsSupportBackUpTestMode'
  );
  req.destination = addr;
  req.address = AddressMapping.IsSupportBackUpTestModeAddr;
  return req;
}
Session.prototype.ReadSender_IsSupportBackUpTestMode =
  async function ReadSender_IsSupportBackUpTestMode(this: Session, addr: number): Promise<number> {
    const req = createReadSender_IsSupportBackUpTestMode(addr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadSender_IsSupportBackUpTestMode =
  async function tryReadSender_IsSupportBackUpTestMode(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_IsSupportBackUpTestMode(addr);
    return this.connection.trySend(req);
  };
