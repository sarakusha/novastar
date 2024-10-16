import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_FPGAProgramEdition(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      sender_FPGAProgramEdition: number
    ): Promise<void>;
    trySetSender_FPGAProgramEdition(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      sender_FPGAProgramEdition: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_FPGAProgramEdition<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  sender_FPGAProgramEdition: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    sender_FPGAProgramEdition,
    AddressMapping.Scanner_FPGAProgramEditionOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetSender_FPGAProgramEdition');
  req.destination = addr;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Sender_FPGAProgramEditionAddr;
  return req;
}
Session.prototype.SetSender_FPGAProgramEdition = async function SetSender_FPGAProgramEdition(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  sender_FPGAProgramEdition: number
): Promise<void> {
  const req = createSetSender_FPGAProgramEdition(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    sender_FPGAProgramEdition
  );
  await this.connection.send(req);
};
Session.prototype.trySetSender_FPGAProgramEdition = async function trySetSender_FPGAProgramEdition(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  sender_FPGAProgramEdition: number
): Promise<ErrorType | null> {
  const req = createSetSender_FPGAProgramEdition(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    sender_FPGAProgramEdition
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
