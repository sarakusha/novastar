import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetGgain(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      ggain: number
    ): Promise<void>;
    trySetGgain(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      ggain: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetGgain<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  ggain: number
): Request<Broadcast> {
  const $data = encodeUIntLE(ggain, AddressMapping.GgainOccupancy);
  const req = new Request($data, bBroadcast, 'SetGgain');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GgainAddr;
  return req;
}
Session.prototype.SetGgain = async function SetGgain(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  ggain: number
): Promise<void> {
  const req = createSetGgain(addr, portAddr, scanBoardAddr, bBroadcast, ggain);
  await this.connection.send(req);
};
Session.prototype.trySetGgain = async function trySetGgain(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  ggain: number
): Promise<ErrorType | null> {
  const req = createSetGgain(addr, portAddr, scanBoardAddr, false, ggain);
  return (await this.connection.trySend(req))?.ack ?? null;
};
