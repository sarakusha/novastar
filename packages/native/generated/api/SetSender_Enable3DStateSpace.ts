import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_Enable3DStateSpace(
      addr: number,
      bBroadcast: boolean,
      enable3DState: number
    ): Promise<void>;
    trySetSender_Enable3DStateSpace(addr: number, enable3DState: number): Promise<ErrorType | null>;
  }
}
export default function createSetSender_Enable3DStateSpace<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  enable3DState: number
): Request<Broadcast> {
  const req = new Request([enable3DState], bBroadcast, 'SetSender_Enable3DStateSpace');
  req.destination = addr;
  req.address = AddressMapping.Enable3DAddr;
  return req;
}
Session.prototype.SetSender_Enable3DStateSpace = async function SetSender_Enable3DStateSpace(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  enable3DState: number
): Promise<void> {
  const req = createSetSender_Enable3DStateSpace(addr, bBroadcast, enable3DState);
  await this.connection.send(req);
};
Session.prototype.trySetSender_Enable3DStateSpace = async function trySetSender_Enable3DStateSpace(
  this: Session,
  addr: number,
  enable3DState: number
): Promise<ErrorType | null> {
  const req = createSetSender_Enable3DStateSpace(addr, false, enable3DState);
  return (await this.connection.trySend(req))?.ack ?? null;
};
