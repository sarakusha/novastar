import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadWheelReadingCureParameterToFactoryAreaData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadWheelReadingCureParameterToFactoryAreaData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadWheelReadingCureParameterToFactoryAreaData(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.GeneralPurposeRegisterOccupancy,
    'ReadWheelReadingCureParameterToFactoryAreaData'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GeneralPurposeRegisterAddr;
  return req;
}
Session.prototype.ReadWheelReadingCureParameterToFactoryAreaData =
  async function ReadWheelReadingCureParameterToFactoryAreaData(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = createReadWheelReadingCureParameterToFactoryAreaData(addr, portAddr, scanBoardAddr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadWheelReadingCureParameterToFactoryAreaData =
  async function tryReadWheelReadingCureParameterToFactoryAreaData(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Packet | null> {
    const req = createReadWheelReadingCureParameterToFactoryAreaData(addr, portAddr, scanBoardAddr);
    return this.connection.trySend(req);
  };
