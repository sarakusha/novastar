import { Packet, Request, Session } from '@novastar/codec';
import MaxValueInfo from '../MaxValueInfo';

declare module '@novastar/codec' {
  interface API {
    ReadOnePackageSBParameters(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Buffer>;
    tryReadOnePackageSBParameters(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadOnePackageSBParameters(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(MaxValueInfo.MAX_PARAMETER_TABLE_LEN, 'ReadOnePackageSBParameters');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = 33554432;
  return req;
}
Session.prototype.ReadOnePackageSBParameters = async function ReadOnePackageSBParameters(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadOnePackageSBParameters(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadOnePackageSBParameters = async function tryReadOnePackageSBParameters(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadOnePackageSBParameters(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
