import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadBitErrorRateData(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadBitErrorRateData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadBitErrorRateData(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.BitErrorRateOccupancy, 'ReadBitErrorRateData');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.BitErrorRateAddr;
  return req;
}
Session.prototype.ReadBitErrorRateData = async function ReadBitErrorRateData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadBitErrorRateData(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadBitErrorRateData = async function tryReadBitErrorRateData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadBitErrorRateData(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
