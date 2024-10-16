import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScanner_FPGAProgramLength(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadScanner_FPGAProgramLength(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScanner_FPGAProgramLength(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.Scanner_FPGAProgramLengthOccupancy,
    'ReadScanner_FPGAProgramLength'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_FPGAProgramLengthAddr;
  return req;
}
Session.prototype.ReadScanner_FPGAProgramLength = async function ReadScanner_FPGAProgramLength(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadScanner_FPGAProgramLength(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadScanner_FPGAProgramLength =
  async function tryReadScanner_FPGAProgramLength(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Packet | null> {
    const req = createReadScanner_FPGAProgramLength(addr, portAddr, scanBoardAddr);
    return this.connection.trySend(req);
  };
