import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    WriteSender_HWScreenData(
      addr: number,
      bBoradcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    tryWriteSender_HWScreenData(addr: number, data: number[] | Buffer): Promise<ErrorType | null>;
  }
}
export default function createWriteSender_HWScreenData<Broadcast extends boolean>(
  addr: number,
  bBoradcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(data, bBoradcast, 'WriteSender_HWScreenData');
  req.destination = addr;
  req.address = AddressMapping.Sender_HWScreenDisplayDataAddr;
  return req;
}
Session.prototype.WriteSender_HWScreenData = async function WriteSender_HWScreenData(
  this: Session,
  addr: number,
  bBoradcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createWriteSender_HWScreenData(addr, bBoradcast, data);
  await this.connection.send(req);
};
Session.prototype.tryWriteSender_HWScreenData = async function tryWriteSender_HWScreenData(
  this: Session,
  addr: number,
  data: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createWriteSender_HWScreenData(addr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
