import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_VideoInputCut(
      addr: number,
      bBoradcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetSender_VideoInputCut(addr: number, data: number[] | Buffer): Promise<ErrorType | null>;
  }
}
export default function createSetSender_VideoInputCut<Broadcast extends boolean>(
  addr: number,
  bBoradcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  if (data.length !== AddressMapping.Sender_VideoInputCutOccupancy)
    throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, bBoradcast, 'SetSender_VideoInputCut');
  req.destination = addr;
  req.address = AddressMapping.Sender_VideoInputCutAddr;
  return req;
}
Session.prototype.SetSender_VideoInputCut = async function SetSender_VideoInputCut(
  this: Session,
  addr: number,
  bBoradcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createSetSender_VideoInputCut(addr, bBoradcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetSender_VideoInputCut = async function trySetSender_VideoInputCut(
  this: Session,
  addr: number,
  data: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSender_VideoInputCut(addr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
