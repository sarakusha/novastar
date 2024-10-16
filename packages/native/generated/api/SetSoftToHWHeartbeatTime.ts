import { ErrorType, Request, Session } from '@novastar/codec';

declare module '@novastar/codec' {
  interface API {
    SetSoftToHWHeartbeatTime(
      addr: number,
      bBroadcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetSoftToHWHeartbeatTime(addr: number, data: number[] | Buffer): Promise<ErrorType | null>;
  }
}
export default function createSetSoftToHWHeartbeatTime<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(data, bBroadcast, 'SetSoftToHWHeartbeatTime');
  req.destination = addr;
  req.address = 63;
  return req;
}
Session.prototype.SetSoftToHWHeartbeatTime = async function SetSoftToHWHeartbeatTime(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createSetSoftToHWHeartbeatTime(addr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetSoftToHWHeartbeatTime = async function trySetSoftToHWHeartbeatTime(
  this: Session,
  addr: number,
  data: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSoftToHWHeartbeatTime(addr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
