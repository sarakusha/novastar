import { Packet, Request, Session } from '@novastar/codec';

declare module '@novastar/codec' {
  interface API {
    ReadOnePackageSBParameters_1(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dataLength: number
    ): Promise<Buffer>;
    tryReadOnePackageSBParameters_1(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dataLength: number
    ): Promise<Packet | null>;
  }
}
export default function createReadOnePackageSBParameters_1(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dataLength: number
): Request {
  const req = new Request(dataLength, 'ReadOnePackageSBParameters_1');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = 33554432;
  return req;
}
Session.prototype.ReadOnePackageSBParameters_1 = async function ReadOnePackageSBParameters_1(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dataLength: number
): Promise<Buffer> {
  const req = createReadOnePackageSBParameters_1(addr, portAddr, scanBoardAddr, dataLength);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadOnePackageSBParameters_1 = async function tryReadOnePackageSBParameters_1(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dataLength: number
): Promise<Packet | null> {
  const req = createReadOnePackageSBParameters_1(addr, portAddr, scanBoardAddr, dataLength);
  return this.connection.trySend(req);
};
