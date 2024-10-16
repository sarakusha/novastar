import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_McuProgramEdition(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      sender_McuProgramEdition: number
    ): Promise<void>;
    trySetSender_McuProgramEdition(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      sender_McuProgramEdition: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_McuProgramEdition<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  sender_McuProgramEdition: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    sender_McuProgramEdition,
    AddressMapping.Sender_McuProgramEditionOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetSender_McuProgramEdition');
  req.destination = addr;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Sender_McuProgramEditionAddr;
  return req;
}
Session.prototype.SetSender_McuProgramEdition = async function SetSender_McuProgramEdition(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  sender_McuProgramEdition: number
): Promise<void> {
  const req = createSetSender_McuProgramEdition(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    sender_McuProgramEdition
  );
  await this.connection.send(req);
};
Session.prototype.trySetSender_McuProgramEdition = async function trySetSender_McuProgramEdition(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  sender_McuProgramEdition: number
): Promise<ErrorType | null> {
  const req = createSetSender_McuProgramEdition(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    sender_McuProgramEdition
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
