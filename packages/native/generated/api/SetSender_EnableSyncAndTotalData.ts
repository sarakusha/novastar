import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_EnableSyncAndTotalData(
      addr: number,
      bBoradcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetSender_EnableSyncAndTotalData(
      addr: number,
      data: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_EnableSyncAndTotalData<Broadcast extends boolean>(
  addr: number,
  bBoradcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  if (data.length !== AddressMapping.Sender_EnableSyncAndTotalDataOccupancy)
    throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, bBoradcast, 'SetSender_EnableSyncAndTotalData');
  req.destination = addr;
  req.address = AddressMapping.Sender_EnableSyncAndTotalDataAddr;
  return req;
}
Session.prototype.SetSender_EnableSyncAndTotalData =
  async function SetSender_EnableSyncAndTotalData(
    this: Session,
    addr: number,
    bBoradcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = createSetSender_EnableSyncAndTotalData(addr, bBoradcast, data);
    await this.connection.send(req);
  };
Session.prototype.trySetSender_EnableSyncAndTotalData =
  async function trySetSender_EnableSyncAndTotalData(
    this: Session,
    addr: number,
    data: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createSetSender_EnableSyncAndTotalData(addr, false, data);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
