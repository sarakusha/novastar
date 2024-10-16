import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Read9868ABlankOptimizationLevel1(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryRead9868ABlankOptimizationLevel1(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createRead9868ABlankOptimizationLevel1(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.Scanner_BlankOptimizationLevelOccupancy,
    'Read9868ABlankOptimizationLevel1'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_9868ABlankOptimizationLevelAddr1;
  return req;
}
Session.prototype.Read9868ABlankOptimizationLevel1 =
  async function Read9868ABlankOptimizationLevel1(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = createRead9868ABlankOptimizationLevel1(addr, portAddr, scanBoardAddr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryRead9868ABlankOptimizationLevel1 =
  async function tryRead9868ABlankOptimizationLevel1(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Packet | null> {
    const req = createRead9868ABlankOptimizationLevel1(addr, portAddr, scanBoardAddr);
    return this.connection.trySend(req);
  };
