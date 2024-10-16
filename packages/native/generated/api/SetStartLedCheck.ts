import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetStartLedCheck(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      startLedCheck: number
    ): Promise<void>;
    trySetStartLedCheck(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      startLedCheck: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetStartLedCheck<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  startLedCheck: number
): Request<Broadcast> {
  const $data = encodeUIntLE(startLedCheck, AddressMapping.StartLedCheckOccupancy);
  const req = new Request($data, bBroadcast, 'SetStartLedCheck');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.StartLedCheckAddr;
  return req;
}
Session.prototype.SetStartLedCheck = async function SetStartLedCheck(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  startLedCheck: number
): Promise<void> {
  const req = createSetStartLedCheck(addr, portAddr, scanBoardAddr, bBroadcast, startLedCheck);
  await this.connection.send(req);
};
Session.prototype.trySetStartLedCheck = async function trySetStartLedCheck(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  startLedCheck: number
): Promise<ErrorType | null> {
  const req = createSetStartLedCheck(addr, portAddr, scanBoardAddr, false, startLedCheck);
  return (await this.connection.trySend(req))?.ack ?? null;
};
