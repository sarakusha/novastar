import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_EnablePartBrightOfHWPro(addr: number): Promise<number>;
    tryReadSender_EnablePartBrightOfHWPro(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_EnablePartBrightOfHWPro(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_EnablePartOfBrightOccupancy,
    'ReadSender_EnablePartBrightOfHWPro'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_EnablePartOfBrightAddr;
  return req;
}
Session.prototype.ReadSender_EnablePartBrightOfHWPro =
  async function ReadSender_EnablePartBrightOfHWPro(this: Session, addr: number): Promise<number> {
    const req = createReadSender_EnablePartBrightOfHWPro(addr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadSender_EnablePartBrightOfHWPro =
  async function tryReadSender_EnablePartBrightOfHWPro(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_EnablePartBrightOfHWPro(addr);
    return this.connection.trySend(req);
  };
