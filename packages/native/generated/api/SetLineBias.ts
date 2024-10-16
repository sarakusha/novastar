import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetLineBias(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      lineBias: number
    ): Promise<void>;
    trySetLineBias(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      lineBias: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetLineBias<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  lineBias: number
): Request<Broadcast> {
  const $data = encodeUIntLE(lineBias, AddressMapping.LineBiasOccupancy);
  const req = new Request($data, bBroadcast, 'SetLineBias');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LineBiasAddr;
  return req;
}
Session.prototype.SetLineBias = async function SetLineBias(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  lineBias: number
): Promise<void> {
  const req = createSetLineBias(addr, portAddr, scanBoardAddr, bBroadcast, lineBias);
  await this.connection.send(req);
};
Session.prototype.trySetLineBias = async function trySetLineBias(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  lineBias: number
): Promise<ErrorType | null> {
  const req = createSetLineBias(addr, portAddr, scanBoardAddr, false, lineBias);
  return (await this.connection.trySend(req))?.ack ?? null;
};
