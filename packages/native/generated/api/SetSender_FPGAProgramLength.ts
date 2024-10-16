import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_FPGAProgramLength(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      sender_FPGAProgramLength: number
    ): Promise<void>;
    trySetSender_FPGAProgramLength(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      sender_FPGAProgramLength: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_FPGAProgramLength<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  sender_FPGAProgramLength: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    sender_FPGAProgramLength,
    AddressMapping.Sender_FPGAProgramLengthOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetSender_FPGAProgramLength');
  req.destination = addr;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Sender_FPGAProgramLengthAddr;
  return req;
}
Session.prototype.SetSender_FPGAProgramLength = async function SetSender_FPGAProgramLength(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  sender_FPGAProgramLength: number
): Promise<void> {
  const req = createSetSender_FPGAProgramLength(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    sender_FPGAProgramLength
  );
  await this.connection.send(req);
};
Session.prototype.trySetSender_FPGAProgramLength = async function trySetSender_FPGAProgramLength(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  sender_FPGAProgramLength: number
): Promise<ErrorType | null> {
  const req = createSetSender_FPGAProgramLength(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    sender_FPGAProgramLength
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
