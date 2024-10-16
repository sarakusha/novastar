import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Switch2053IP(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      switchIP2053Enable: boolean
    ): Promise<void>;
    trySwitch2053IP(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      switchIP2053Enable: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSwitch2053IP<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  switchIP2053Enable: boolean
): Request<Broadcast> {
  const $data = encodeUIntLE(!switchIP2053Enable ? 5 : 0, AddressMapping.SwitchIP2053Occupancy);
  const req = new Request($data, bBroadcast, 'Switch2053IP');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SwitchIP2053Addr;
  return req;
}
Session.prototype.Switch2053IP = async function Switch2053IP(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  switchIP2053Enable: boolean
): Promise<void> {
  const req = createSwitch2053IP(addr, portAddr, scanBoardAddr, bBroadcast, switchIP2053Enable);
  await this.connection.send(req);
};
Session.prototype.trySwitch2053IP = async function trySwitch2053IP(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  switchIP2053Enable: boolean
): Promise<ErrorType | null> {
  const req = createSwitch2053IP(addr, portAddr, scanBoardAddr, false, switchIP2053Enable);
  return (await this.connection.trySend(req))?.ack ?? null;
};
