import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadGclkNumPerScan(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadGclkNumPerScan(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadGclkNumPerScan(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.GclkNumPerScanOccupancy, 'ReadGclkNumPerScan');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GclkNumPerScanAddr;
  return req;
}
Session.prototype.ReadGclkNumPerScan = async function ReadGclkNumPerScan(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadGclkNumPerScan(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadGclkNumPerScan = async function tryReadGclkNumPerScan(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadGclkNumPerScan(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
