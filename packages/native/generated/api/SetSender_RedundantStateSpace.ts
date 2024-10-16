import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_RedundantStateSpace(
      addr: number,
      bBroadcast: boolean,
      redundantState: number[] | Buffer
    ): Promise<void>;
    trySetSender_RedundantStateSpace(
      addr: number,
      redundantState: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_RedundantStateSpace<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  redundantState: number[] | Buffer
): Request<Broadcast> {
  if (redundantState.length !== AddressMapping.Sender_RedundantStateSpaceOccupancy)
    throw new TypeError(`Invalid buffer size: ${redundantState.length}`);
  const req = new Request(redundantState, bBroadcast, 'SetSender_RedundantStateSpace');
  req.destination = addr;
  req.address = AddressMapping.Sender_RedundantStateSpaceAddr;
  return req;
}
Session.prototype.SetSender_RedundantStateSpace = async function SetSender_RedundantStateSpace(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  redundantState: number[] | Buffer
): Promise<void> {
  const req = createSetSender_RedundantStateSpace(addr, bBroadcast, redundantState);
  await this.connection.send(req);
};
Session.prototype.trySetSender_RedundantStateSpace =
  async function trySetSender_RedundantStateSpace(
    this: Session,
    addr: number,
    redundantState: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createSetSender_RedundantStateSpace(addr, false, redundantState);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
