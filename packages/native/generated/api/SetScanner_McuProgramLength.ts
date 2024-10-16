import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_McuProgramLength(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      scanner_McuProgramLength: number
    ): Promise<void>;
    trySetScanner_McuProgramLength(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      scanner_McuProgramLength: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_McuProgramLength<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  scanner_McuProgramLength: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    scanner_McuProgramLength,
    AddressMapping.Scanner_McuProgramLengthOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetScanner_McuProgramLength');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_McuProgramLengthAddr;
  return req;
}
Session.prototype.SetScanner_McuProgramLength = async function SetScanner_McuProgramLength(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  scanner_McuProgramLength: number
): Promise<void> {
  const req = createSetScanner_McuProgramLength(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    scanner_McuProgramLength
  );
  await this.connection.send(req);
};
Session.prototype.trySetScanner_McuProgramLength = async function trySetScanner_McuProgramLength(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  scanner_McuProgramLength: number
): Promise<ErrorType | null> {
  const req = createSetScanner_McuProgramLength(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    scanner_McuProgramLength
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
