import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDisConnectRelayTemperature(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadDisConnectRelayTemperature(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadDisConnectRelayTemperature(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.DisConnectRelayTemperatureOccupancy,
    'ReadDisConnectRelayTemperature'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DisConnectRelayTemperatureAddr;
  return req;
}
Session.prototype.ReadDisConnectRelayTemperature = async function ReadDisConnectRelayTemperature(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadDisConnectRelayTemperature(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDisConnectRelayTemperature =
  async function tryReadDisConnectRelayTemperature(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Packet | null> {
    const req = createReadDisConnectRelayTemperature(addr, portAddr, scanBoardAddr);
    return this.connection.trySend(req);
  };
