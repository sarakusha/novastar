import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadStartPositionOfDataGroup(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Buffer>;
    tryReadStartPositionOfDataGroup(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadStartPositionOfDataGroup(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.StartPositionOfDataGroupOccupancy * AddressMapping.StartPositionOfDataGroupNum,
    'ReadStartPositionOfDataGroup'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.StartPositionOfDataGroupAddr;
  return req;
}
Session.prototype.ReadStartPositionOfDataGroup = async function ReadStartPositionOfDataGroup(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadStartPositionOfDataGroup(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadStartPositionOfDataGroup = async function tryReadStartPositionOfDataGroup(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadStartPositionOfDataGroup(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
