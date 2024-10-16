import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadIrregularCabinetDataGroupOutputInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dataLength: number
    ): Promise<Buffer>;
    tryReadIrregularCabinetDataGroupOutputInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dataLength: number
    ): Promise<Packet | null>;
  }
}
export default function createReadIrregularCabinetDataGroupOutputInfo(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dataLength: number
): Request {
  const req = new Request(dataLength, 'ReadIrregularCabinetDataGroupOutputInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.IrRegular_DataGroupOutputInfoAddr;
  return req;
}
Session.prototype.ReadIrregularCabinetDataGroupOutputInfo =
  async function ReadIrregularCabinetDataGroupOutputInfo(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    dataLength: number
  ): Promise<Buffer> {
    const req = createReadIrregularCabinetDataGroupOutputInfo(
      addr,
      portAddr,
      scanBoardAddr,
      dataLength
    );
    return (await this.connection.send(req)).data;
  };
Session.prototype.tryReadIrregularCabinetDataGroupOutputInfo =
  async function tryReadIrregularCabinetDataGroupOutputInfo(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    dataLength: number
  ): Promise<Packet | null> {
    const req = createReadIrregularCabinetDataGroupOutputInfo(
      addr,
      portAddr,
      scanBoardAddr,
      dataLength
    );
    return this.connection.trySend(req);
  };
