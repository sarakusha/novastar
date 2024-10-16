import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_FPGAProgramInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      sender_FPGAProgramRemarks: number[] | Buffer
    ): Promise<void>;
    trySetSender_FPGAProgramInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      sender_FPGAProgramRemarks: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_FPGAProgramInfo<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  sender_FPGAProgramRemarks: number[] | Buffer
): Request<Broadcast> {
  if (sender_FPGAProgramRemarks.length !== AddressMapping.Sender_FPGAProgramInfoOccupancy)
    throw new TypeError(`Invalid buffer size: ${sender_FPGAProgramRemarks.length}`);
  const req = new Request(sender_FPGAProgramRemarks, bBroadcast, 'SetSender_FPGAProgramInfo');
  req.destination = addr;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Sender_FPGAProgramInfoAddr;
  return req;
}
Session.prototype.SetSender_FPGAProgramInfo = async function SetSender_FPGAProgramInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  sender_FPGAProgramRemarks: number[] | Buffer
): Promise<void> {
  const req = createSetSender_FPGAProgramInfo(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    sender_FPGAProgramRemarks
  );
  await this.connection.send(req);
};
Session.prototype.trySetSender_FPGAProgramInfo = async function trySetSender_FPGAProgramInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  sender_FPGAProgramRemarks: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSender_FPGAProgramInfo(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    sender_FPGAProgramRemarks
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
