import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScanner_FPGAProgramRemarks(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Buffer>;
    tryReadScanner_FPGAProgramRemarks(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScanner_FPGAProgramRemarks(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.Scanner_FPGAProgramRemarksOccupancy,
    'ReadScanner_FPGAProgramRemarks'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_FPGAProgramRemarksAddr;
  return req;
}
Session.prototype.ReadScanner_FPGAProgramRemarks = async function ReadScanner_FPGAProgramRemarks(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadScanner_FPGAProgramRemarks(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadScanner_FPGAProgramRemarks =
  async function tryReadScanner_FPGAProgramRemarks(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Packet | null> {
    const req = createReadScanner_FPGAProgramRemarks(addr, portAddr, scanBoardAddr);
    return this.connection.trySend(req);
  };
