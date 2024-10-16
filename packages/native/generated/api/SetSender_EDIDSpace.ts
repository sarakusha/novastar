import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_EDIDSpace(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      Passward: number[] | Buffer
    ): Promise<void>;
    trySetSender_EDIDSpace(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      Passward: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_EDIDSpace<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  Passward: number[] | Buffer
): Request<Broadcast> {
  if (Passward.length !== AddressMapping.Sender_EDIDSpaceOccupancy)
    throw new TypeError(`Invalid buffer size: ${Passward.length}`);
  const req = new Request(Passward, bBroadcast, 'SetSender_EDIDSpace');
  req.destination = addr;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Sender_EDIDSpaceAddr;
  return req;
}
Session.prototype.SetSender_EDIDSpace = async function SetSender_EDIDSpace(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  Passward: number[] | Buffer
): Promise<void> {
  const req = createSetSender_EDIDSpace(addr, portAddr, scanBoardAddr, bBroadcast, Passward);
  await this.connection.send(req);
};
Session.prototype.trySetSender_EDIDSpace = async function trySetSender_EDIDSpace(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  Passward: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSender_EDIDSpace(addr, portAddr, scanBoardAddr, false, Passward);
  return (await this.connection.trySend(req))?.ack ?? null;
};
