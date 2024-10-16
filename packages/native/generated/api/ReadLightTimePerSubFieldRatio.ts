import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadLightTimePerSubFieldRatio(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadLightTimePerSubFieldRatio(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadLightTimePerSubFieldRatio(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.LightTimePerSubFieldRatioOccupancy,
    'ReadLightTimePerSubFieldRatio'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LightTimePerSubFieldRatioAddr;
  return req;
}
Session.prototype.ReadLightTimePerSubFieldRatio = async function ReadLightTimePerSubFieldRatio(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadLightTimePerSubFieldRatio(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadLightTimePerSubFieldRatio =
  async function tryReadLightTimePerSubFieldRatio(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Packet | null> {
    const req = createReadLightTimePerSubFieldRatio(addr, portAddr, scanBoardAddr);
    return this.connection.trySend(req);
  };
