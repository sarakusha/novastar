import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_McuProgramLength(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      sender_McuProgramLength: number
    ): Promise<void>;
    trySetSender_McuProgramLength(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      sender_McuProgramLength: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_McuProgramLength<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  sender_McuProgramLength: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    sender_McuProgramLength,
    AddressMapping.Sender_McuProgramLengthOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetSender_McuProgramLength');
  req.destination = addr;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Sender_McuProgramLengthAddr;
  return req;
}
Session.prototype.SetSender_McuProgramLength = async function SetSender_McuProgramLength(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  sender_McuProgramLength: number
): Promise<void> {
  const req = createSetSender_McuProgramLength(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    sender_McuProgramLength
  );
  await this.connection.send(req);
};
Session.prototype.trySetSender_McuProgramLength = async function trySetSender_McuProgramLength(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  sender_McuProgramLength: number
): Promise<ErrorType | null> {
  const req = createSetSender_McuProgramLength(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    sender_McuProgramLength
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
