import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_RedundantStateNewSpace(
      addr: number,
      bBroadcast: boolean,
      redundantState: number[] | Buffer
    ): Promise<void>;
    trySetSender_RedundantStateNewSpace(
      addr: number,
      redundantState: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_RedundantStateNewSpace<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  redundantState: number[] | Buffer
): Request<Broadcast> {
  if (redundantState.length !== AddressMapping.Sender_RedundantStateSpaceOccupancy)
    throw new TypeError(`Invalid buffer size: ${redundantState.length}`);
  const req = new Request(redundantState, bBroadcast, 'SetSender_RedundantStateNewSpace');
  req.destination = addr;
  req.address = AddressMapping.Sender_RedundantStateSpaceNewAddr;
  return req;
}
Session.prototype.SetSender_RedundantStateNewSpace =
  async function SetSender_RedundantStateNewSpace(
    this: Session,
    addr: number,
    bBroadcast: boolean,
    redundantState: number[] | Buffer
  ): Promise<void> {
    const req = createSetSender_RedundantStateNewSpace(addr, bBroadcast, redundantState);
    await this.connection.send(req);
  };
Session.prototype.trySetSender_RedundantStateNewSpace =
  async function trySetSender_RedundantStateNewSpace(
    this: Session,
    addr: number,
    redundantState: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createSetSender_RedundantStateNewSpace(addr, false, redundantState);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
