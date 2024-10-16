import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadNoCorrectionThreshold(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Buffer>;
    tryReadNoCorrectionThreshold(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadNoCorrectionThreshold(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.NoCorrectionThresholdOccupancy,
    'ReadNoCorrectionThreshold'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.NoCorrectionThresholdAddr;
  return req;
}
Session.prototype.ReadNoCorrectionThreshold = async function ReadNoCorrectionThreshold(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadNoCorrectionThreshold(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadNoCorrectionThreshold = async function tryReadNoCorrectionThreshold(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadNoCorrectionThreshold(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
