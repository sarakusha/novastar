import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScanner_FPGAProgramEdition(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadScanner_FPGAProgramEdition(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadScanner_FPGAProgramEdition(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.Scanner_FPGAProgramEditionOccupancy,
    'ReadScanner_FPGAProgramEdition'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_FPGAProgramEditionAddr;
  return req;
}
Session.prototype.ReadScanner_FPGAProgramEdition = async function ReadScanner_FPGAProgramEdition(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadScanner_FPGAProgramEdition(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadScanner_FPGAProgramEdition =
  async function tryReadScanner_FPGAProgramEdition(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Packet | null> {
    const req = createReadScanner_FPGAProgramEdition(addr, portAddr, scanBoardAddr);
    return this.connection.trySend(req);
  };
