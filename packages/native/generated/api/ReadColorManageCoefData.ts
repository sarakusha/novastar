import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadColorManageCoefData(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer>;
    tryReadColorManageCoefData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadColorManageCoefData(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.ColorManageInfoAddrOccupancy, 'ReadColorManageCoefData');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ColorManageInfoAddr;
  return req;
}
Session.prototype.ReadColorManageCoefData = async function ReadColorManageCoefData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadColorManageCoefData(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadColorManageCoefData = async function tryReadColorManageCoefData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadColorManageCoefData(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
