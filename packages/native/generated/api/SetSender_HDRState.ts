import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_HDRState(addr: number, bBroadcast: boolean, enableHDRState: boolean): Promise<void>;
    trySetSender_HDRState(addr: number, enableHDRState: boolean): Promise<ErrorType | null>;
  }
}
export default function createSetSender_HDRState<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  enableHDRState: boolean
): Request<Broadcast> {
  const req = new Request(enableHDRState ? [88] : [0], bBroadcast, 'SetSender_HDRState');
  req.destination = addr;
  req.address = AddressMapping.HDRInfoAddr;
  return req;
}
Session.prototype.SetSender_HDRState = async function SetSender_HDRState(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  enableHDRState: boolean
): Promise<void> {
  const req = createSetSender_HDRState(addr, bBroadcast, enableHDRState);
  await this.connection.send(req);
};
Session.prototype.trySetSender_HDRState = async function trySetSender_HDRState(
  this: Session,
  addr: number,
  enableHDRState: boolean
): Promise<ErrorType | null> {
  const req = createSetSender_HDRState(addr, false, enableHDRState);
  return (await this.connection.trySend(req))?.ack ?? null;
};
