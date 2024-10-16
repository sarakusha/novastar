import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    WriteDviOf4KInfo(
      addr: number,
      bBroadcast: boolean,
      dviInfoBytes: number[] | Buffer
    ): Promise<void>;
    tryWriteDviOf4KInfo(addr: number, dviInfoBytes: number[] | Buffer): Promise<ErrorType | null>;
  }
}
export default function createWriteDviOf4KInfo<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  dviInfoBytes: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(dviInfoBytes, bBroadcast, 'WriteDviOf4KInfo');
  req.destination = addr;
  req.address = AddressMapping.DVIOf4KInfoAddr;
  return req;
}
Session.prototype.WriteDviOf4KInfo = async function WriteDviOf4KInfo(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  dviInfoBytes: number[] | Buffer
): Promise<void> {
  const req = createWriteDviOf4KInfo(addr, bBroadcast, dviInfoBytes);
  await this.connection.send(req);
};
Session.prototype.tryWriteDviOf4KInfo = async function tryWriteDviOf4KInfo(
  this: Session,
  addr: number,
  dviInfoBytes: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createWriteDviOf4KInfo(addr, false, dviInfoBytes);
  return (await this.connection.trySend(req))?.ack ?? null;
};
