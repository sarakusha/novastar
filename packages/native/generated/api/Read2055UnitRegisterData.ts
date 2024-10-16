import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Read2055UnitRegisterData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      unit: number
    ): Promise<Buffer>;
    tryRead2055UnitRegisterData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      unit: number
    ): Promise<Packet | null>;
  }
}
export default function createRead2055UnitRegisterData(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  unit: number
): Request {
  const req = new Request(
    AddressMapping.Config2055UnitRegisterOccupancy,
    'Read2055UnitRegisterData'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Config2055RegisterAddr + unit * 8;
  return req;
}
Session.prototype.Read2055UnitRegisterData = async function Read2055UnitRegisterData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  unit: number
): Promise<Buffer> {
  const req = createRead2055UnitRegisterData(addr, portAddr, scanBoardAddr, unit);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryRead2055UnitRegisterData = async function tryRead2055UnitRegisterData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  unit: number
): Promise<Packet | null> {
  const req = createRead2055UnitRegisterData(addr, portAddr, scanBoardAddr, unit);
  return this.connection.trySend(req);
};
