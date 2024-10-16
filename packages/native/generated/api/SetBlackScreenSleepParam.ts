import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetBlackScreenSleepParam(
      addr: number,
      bBoradcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetBlackScreenSleepParam(addr: number, data: number[] | Buffer): Promise<ErrorType | null>;
  }
}
export default function createSetBlackScreenSleepParam<Broadcast extends boolean>(
  addr: number,
  bBoradcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(data, bBoradcast, 'SetBlackScreenSleepParam');
  req.destination = addr;
  req.address = AddressMapping.Sender_BlackScreenSleepAddr;
  return req;
}
Session.prototype.SetBlackScreenSleepParam = async function SetBlackScreenSleepParam(
  this: Session,
  addr: number,
  bBoradcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createSetBlackScreenSleepParam(addr, bBoradcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetBlackScreenSleepParam = async function trySetBlackScreenSleepParam(
  this: Session,
  addr: number,
  data: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetBlackScreenSleepParam(addr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
