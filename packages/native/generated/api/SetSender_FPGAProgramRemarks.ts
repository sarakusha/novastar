import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_FPGAProgramRemarks(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      sender_FPGAProgramRemarks: number[] | Buffer
    ): Promise<void>;
    trySetSender_FPGAProgramRemarks(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      sender_FPGAProgramRemarks: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_FPGAProgramRemarks<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  sender_FPGAProgramRemarks: number[] | Buffer
): Request<Broadcast> {
  if (sender_FPGAProgramRemarks.length !== AddressMapping.Sender_FPGAProgramRemarksOccupancy)
    throw new TypeError(`Invalid buffer size: ${sender_FPGAProgramRemarks.length}`);
  const req = new Request(sender_FPGAProgramRemarks, bBroadcast, 'SetSender_FPGAProgramRemarks');
  req.destination = addr;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Sender_FPGAProgramRemarksAddr;
  return req;
}
Session.prototype.SetSender_FPGAProgramRemarks = async function SetSender_FPGAProgramRemarks(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  sender_FPGAProgramRemarks: number[] | Buffer
): Promise<void> {
  const req = createSetSender_FPGAProgramRemarks(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    sender_FPGAProgramRemarks
  );
  await this.connection.send(req);
};
Session.prototype.trySetSender_FPGAProgramRemarks = async function trySetSender_FPGAProgramRemarks(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  sender_FPGAProgramRemarks: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSender_FPGAProgramRemarks(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    sender_FPGAProgramRemarks
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
