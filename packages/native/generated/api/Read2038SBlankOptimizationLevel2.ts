import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Read2038SBlankOptimizationLevel2(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryRead2038SBlankOptimizationLevel2(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createRead2038SBlankOptimizationLevel2(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.Scanner_BlankOptimizationLevelOccupancy,
    'Read2038SBlankOptimizationLevel2'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_2038SBlankOptimizationLevelAddr2;
  return req;
}
Session.prototype.Read2038SBlankOptimizationLevel2 =
  async function Read2038SBlankOptimizationLevel2(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = createRead2038SBlankOptimizationLevel2(addr, portAddr, scanBoardAddr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryRead2038SBlankOptimizationLevel2 =
  async function tryRead2038SBlankOptimizationLevel2(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Packet | null> {
    const req = createRead2038SBlankOptimizationLevel2(addr, portAddr, scanBoardAddr);
    return this.connection.trySend(req);
  };
