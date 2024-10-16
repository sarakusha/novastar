import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetBgain(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      bgain: number
    ): Promise<void>;
    trySetBgain(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bgain: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetBgain<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  bgain: number
): Request<Broadcast> {
  const $data = encodeUIntLE(bgain, AddressMapping.BgainOccupancy);
  const req = new Request($data, bBroadcast, 'SetBgain');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.BgainAddr;
  return req;
}
Session.prototype.SetBgain = async function SetBgain(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  bgain: number
): Promise<void> {
  const req = createSetBgain(addr, portAddr, scanBoardAddr, bBroadcast, bgain);
  await this.connection.send(req);
};
Session.prototype.trySetBgain = async function trySetBgain(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bgain: number
): Promise<ErrorType | null> {
  const req = createSetBgain(addr, portAddr, scanBoardAddr, false, bgain);
  return (await this.connection.trySend(req))?.ack ?? null;
};
