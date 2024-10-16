import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_McuProgramRemarks(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      sender_McuProgramRemarks: number[] | Buffer
    ): Promise<void>;
    trySetSender_McuProgramRemarks(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      sender_McuProgramRemarks: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_McuProgramRemarks<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  sender_McuProgramRemarks: number[] | Buffer
): Request<Broadcast> {
  if (sender_McuProgramRemarks.length !== AddressMapping.Sender_McuProgramRemarksOccupancy)
    throw new TypeError(`Invalid buffer size: ${sender_McuProgramRemarks.length}`);
  const req = new Request(sender_McuProgramRemarks, bBroadcast, 'SetSender_McuProgramRemarks');
  req.destination = addr;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Sender_McuProgramRemarksAddr;
  return req;
}
Session.prototype.SetSender_McuProgramRemarks = async function SetSender_McuProgramRemarks(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  sender_McuProgramRemarks: number[] | Buffer
): Promise<void> {
  const req = createSetSender_McuProgramRemarks(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    sender_McuProgramRemarks
  );
  await this.connection.send(req);
};
Session.prototype.trySetSender_McuProgramRemarks = async function trySetSender_McuProgramRemarks(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  sender_McuProgramRemarks: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSender_McuProgramRemarks(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    sender_McuProgramRemarks
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
