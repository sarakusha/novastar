import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_HWProBrightSegemntCnt(addr: number): Promise<number>;
    tryReadSender_HWProBrightSegemntCnt(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_HWProBrightSegemntCnt(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_BrightSegemntCntOccupancy,
    'ReadSender_HWProBrightSegemntCnt'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_BrightSegemntCntAddr;
  return req;
}
Session.prototype.ReadSender_HWProBrightSegemntCnt =
  async function ReadSender_HWProBrightSegemntCnt(this: Session, addr: number): Promise<number> {
    const req = createReadSender_HWProBrightSegemntCnt(addr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadSender_HWProBrightSegemntCnt =
  async function tryReadSender_HWProBrightSegemntCnt(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_HWProBrightSegemntCnt(addr);
    return this.connection.trySend(req);
  };
