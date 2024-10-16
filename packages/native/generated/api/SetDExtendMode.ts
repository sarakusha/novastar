import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDExtendMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      extendMode: number
    ): Promise<void>;
    trySetDExtendMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      extendMode: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetDExtendMode<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  extendMode: number
): Request<Broadcast> {
  const $data = encodeUIntLE(extendMode, AddressMapping.DExtendModeOccupancy);
  const req = new Request($data, bBroadcast, 'SetDExtendMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DExtendModeAddr;
  return req;
}
Session.prototype.SetDExtendMode = async function SetDExtendMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  extendMode: number
): Promise<void> {
  const req = createSetDExtendMode(addr, portAddr, scanBoardAddr, bBroadcast, extendMode);
  await this.connection.send(req);
};
Session.prototype.trySetDExtendMode = async function trySetDExtendMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  extendMode: number
): Promise<ErrorType | null> {
  const req = createSetDExtendMode(addr, portAddr, scanBoardAddr, false, extendMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
