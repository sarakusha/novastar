import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadConnectRelayTemperature(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadConnectRelayTemperature(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadConnectRelayTemperature(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.ConnectRelayTemperatureOccupancy,
    'ReadConnectRelayTemperature'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ConnectRelayTemperatureAddr;
  return req;
}
Session.prototype.ReadConnectRelayTemperature = async function ReadConnectRelayTemperature(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadConnectRelayTemperature(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadConnectRelayTemperature = async function tryReadConnectRelayTemperature(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadConnectRelayTemperature(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
