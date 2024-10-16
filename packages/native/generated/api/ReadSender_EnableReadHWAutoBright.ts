import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_EnableReadHWAutoBright(addr: number): Promise<number>;
    tryReadSender_EnableReadHWAutoBright(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_EnableReadHWAutoBright(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_EnableHWAutoBrightOccupancy,
    'ReadSender_EnableReadHWAutoBright'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_EnableHWAutoBrightAddr;
  return req;
}
Session.prototype.ReadSender_EnableReadHWAutoBright =
  async function ReadSender_EnableReadHWAutoBright(this: Session, addr: number): Promise<number> {
    const req = createReadSender_EnableReadHWAutoBright(addr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadSender_EnableReadHWAutoBright =
  async function tryReadSender_EnableReadHWAutoBright(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_EnableReadHWAutoBright(addr);
    return this.connection.trySend(req);
  };
