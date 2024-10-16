import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadIrregularCabinetRealGroup(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dataLength: number
    ): Promise<Buffer>;
    tryReadIrregularCabinetRealGroup(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dataLength: number
    ): Promise<Packet | null>;
  }
}
export default function createReadIrregularCabinetRealGroup(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dataLength: number
): Request {
  const req = new Request(dataLength, 'ReadIrregularCabinetRealGroup');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.IrRegular_RealPhysicalGroupsAddr;
  return req;
}
Session.prototype.ReadIrregularCabinetRealGroup = async function ReadIrregularCabinetRealGroup(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dataLength: number
): Promise<Buffer> {
  const req = createReadIrregularCabinetRealGroup(addr, portAddr, scanBoardAddr, dataLength);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadIrregularCabinetRealGroup =
  async function tryReadIrregularCabinetRealGroup(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    dataLength: number
  ): Promise<Packet | null> {
    const req = createReadIrregularCabinetRealGroup(addr, portAddr, scanBoardAddr, dataLength);
    return this.connection.trySend(req);
  };
