import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_FPGAProgramRemarks(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      scanner_FPGAProgramRemarks: number[] | Buffer
    ): Promise<void>;
    trySetScanner_FPGAProgramRemarks(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      scanner_FPGAProgramRemarks: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_FPGAProgramRemarks<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  scanner_FPGAProgramRemarks: number[] | Buffer
): Request<Broadcast> {
  if (scanner_FPGAProgramRemarks.length !== AddressMapping.Scanner_FPGAProgramRemarksOccupancy)
    throw new TypeError(`Invalid buffer size: ${scanner_FPGAProgramRemarks.length}`);
  const req = new Request(scanner_FPGAProgramRemarks, bBroadcast, 'SetScanner_FPGAProgramRemarks');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_FPGAProgramRemarksAddr;
  return req;
}
Session.prototype.SetScanner_FPGAProgramRemarks = async function SetScanner_FPGAProgramRemarks(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  scanner_FPGAProgramRemarks: number[] | Buffer
): Promise<void> {
  const req = createSetScanner_FPGAProgramRemarks(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    scanner_FPGAProgramRemarks
  );
  await this.connection.send(req);
};
Session.prototype.trySetScanner_FPGAProgramRemarks =
  async function trySetScanner_FPGAProgramRemarks(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    scanner_FPGAProgramRemarks: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createSetScanner_FPGAProgramRemarks(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      scanner_FPGAProgramRemarks
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
