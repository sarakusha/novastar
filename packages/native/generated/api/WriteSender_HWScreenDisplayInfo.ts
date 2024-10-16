import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    WriteSender_HWScreenDisplayInfo(
      addr: number,
      bBoradcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    tryWriteSender_HWScreenDisplayInfo(
      addr: number,
      data: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createWriteSender_HWScreenDisplayInfo<Broadcast extends boolean>(
  addr: number,
  bBoradcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(data, bBoradcast, 'WriteSender_HWScreenDisplayInfo');
  req.destination = addr;
  req.address = AddressMapping.Sender_HWScreenDisplayBaseAddr;
  return req;
}
Session.prototype.WriteSender_HWScreenDisplayInfo = async function WriteSender_HWScreenDisplayInfo(
  this: Session,
  addr: number,
  bBoradcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createWriteSender_HWScreenDisplayInfo(addr, bBoradcast, data);
  await this.connection.send(req);
};
Session.prototype.tryWriteSender_HWScreenDisplayInfo =
  async function tryWriteSender_HWScreenDisplayInfo(
    this: Session,
    addr: number,
    data: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createWriteSender_HWScreenDisplayInfo(addr, false, data);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
