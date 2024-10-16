import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_FPGAProgramInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      scanner_FPGAProgramRemarks: number[] | Buffer
    ): Promise<void>;
    trySetScanner_FPGAProgramInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      scanner_FPGAProgramRemarks: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_FPGAProgramInfo<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  scanner_FPGAProgramRemarks: number[] | Buffer
): Request<Broadcast> {
  if (scanner_FPGAProgramRemarks.length !== AddressMapping.Scanner_FPGAProgramInfoOccupancy)
    throw new TypeError(`Invalid buffer size: ${scanner_FPGAProgramRemarks.length}`);
  const req = new Request(scanner_FPGAProgramRemarks, bBroadcast, 'SetScanner_FPGAProgramInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_FPGAProgramInfoAddr;
  return req;
}
Session.prototype.SetScanner_FPGAProgramInfo = async function SetScanner_FPGAProgramInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  scanner_FPGAProgramRemarks: number[] | Buffer
): Promise<void> {
  const req = createSetScanner_FPGAProgramInfo(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    scanner_FPGAProgramRemarks
  );
  await this.connection.send(req);
};
Session.prototype.trySetScanner_FPGAProgramInfo = async function trySetScanner_FPGAProgramInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  scanner_FPGAProgramRemarks: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScanner_FPGAProgramInfo(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    scanner_FPGAProgramRemarks
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
