import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_McuProgramInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      scanner_McuProgramRemarks: number[] | Buffer
    ): Promise<void>;
    trySetScanner_McuProgramInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      scanner_McuProgramRemarks: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_McuProgramInfo<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  scanner_McuProgramRemarks: number[] | Buffer
): Request<Broadcast> {
  if (scanner_McuProgramRemarks.length !== AddressMapping.Scanner_McuProgramInfoOccupancy)
    throw new TypeError(`Invalid buffer size: ${scanner_McuProgramRemarks.length}`);
  const req = new Request(scanner_McuProgramRemarks, bBroadcast, 'SetScanner_McuProgramInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_McuProgramInfoAddr;
  return req;
}
Session.prototype.SetScanner_McuProgramInfo = async function SetScanner_McuProgramInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  scanner_McuProgramRemarks: number[] | Buffer
): Promise<void> {
  const req = createSetScanner_McuProgramInfo(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    scanner_McuProgramRemarks
  );
  await this.connection.send(req);
};
Session.prototype.trySetScanner_McuProgramInfo = async function trySetScanner_McuProgramInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  scanner_McuProgramRemarks: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScanner_McuProgramInfo(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    scanner_McuProgramRemarks
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
