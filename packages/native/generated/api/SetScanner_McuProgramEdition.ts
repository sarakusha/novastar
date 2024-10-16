import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_McuProgramEdition(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      scanner_McuProgramEdition: number
    ): Promise<void>;
    trySetScanner_McuProgramEdition(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      scanner_McuProgramEdition: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_McuProgramEdition<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  scanner_McuProgramEdition: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    scanner_McuProgramEdition,
    AddressMapping.Scanner_McuProgramEditionOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetScanner_McuProgramEdition');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_McuProgramEditionAddr;
  return req;
}
Session.prototype.SetScanner_McuProgramEdition = async function SetScanner_McuProgramEdition(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  scanner_McuProgramEdition: number
): Promise<void> {
  const req = createSetScanner_McuProgramEdition(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    scanner_McuProgramEdition
  );
  await this.connection.send(req);
};
Session.prototype.trySetScanner_McuProgramEdition = async function trySetScanner_McuProgramEdition(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  scanner_McuProgramEdition: number
): Promise<ErrorType | null> {
  const req = createSetScanner_McuProgramEdition(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    scanner_McuProgramEdition
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
