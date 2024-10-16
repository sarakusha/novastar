import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_EnableGammaOfHWPro(addr: number): Promise<number>;
    tryReadSender_EnableGammaOfHWPro(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_EnableGammaOfHWPro(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_EnableGammaOccupancy,
    'ReadSender_EnableGammaOfHWPro'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_EnableGammaAddr;
  return req;
}
Session.prototype.ReadSender_EnableGammaOfHWPro = async function ReadSender_EnableGammaOfHWPro(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_EnableGammaOfHWPro(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_EnableGammaOfHWPro =
  async function tryReadSender_EnableGammaOfHWPro(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_EnableGammaOfHWPro(addr);
    return this.connection.trySend(req);
  };
