import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_ThreeDPerSpace(
      addr: number,
      bBroadcast: boolean,
      enable3DState: number[] | Buffer
    ): Promise<void>;
    trySetSender_ThreeDPerSpace(
      addr: number,
      enable3DState: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_ThreeDPerSpace<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  enable3DState: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(enable3DState, bBroadcast, 'SetSender_ThreeDPerSpace');
  req.destination = addr;
  req.address = AddressMapping.ThreeDPerAddr;
  return req;
}
Session.prototype.SetSender_ThreeDPerSpace = async function SetSender_ThreeDPerSpace(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  enable3DState: number[] | Buffer
): Promise<void> {
  const req = createSetSender_ThreeDPerSpace(addr, bBroadcast, enable3DState);
  await this.connection.send(req);
};
Session.prototype.trySetSender_ThreeDPerSpace = async function trySetSender_ThreeDPerSpace(
  this: Session,
  addr: number,
  enable3DState: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSender_ThreeDPerSpace(addr, false, enable3DState);
  return (await this.connection.trySend(req))?.ack ?? null;
};
