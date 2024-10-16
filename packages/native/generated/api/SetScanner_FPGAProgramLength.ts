import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_FPGAProgramLength(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      scanner_FPGAProgramLength: number
    ): Promise<void>;
    trySetScanner_FPGAProgramLength(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      scanner_FPGAProgramLength: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_FPGAProgramLength<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  scanner_FPGAProgramLength: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    scanner_FPGAProgramLength,
    AddressMapping.Scanner_FPGAProgramLengthOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetScanner_FPGAProgramLength');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_FPGAProgramLengthAddr;
  return req;
}
Session.prototype.SetScanner_FPGAProgramLength = async function SetScanner_FPGAProgramLength(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  scanner_FPGAProgramLength: number
): Promise<void> {
  const req = createSetScanner_FPGAProgramLength(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    scanner_FPGAProgramLength
  );
  await this.connection.send(req);
};
Session.prototype.trySetScanner_FPGAProgramLength = async function trySetScanner_FPGAProgramLength(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  scanner_FPGAProgramLength: number
): Promise<ErrorType | null> {
  const req = createSetScanner_FPGAProgramLength(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    scanner_FPGAProgramLength
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
