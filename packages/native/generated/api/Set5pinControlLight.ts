import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    Set5pinControlLight(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      tem: number
    ): Promise<void>;
    trySet5pinControlLight(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      tem: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSet5pinControlLight<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  tem: number
): Request<Broadcast> {
  const $data = encodeUIntLE(tem, AddressMapping.ControlLightOccupancy);
  const req = new Request($data, bBroadcast, 'Set5pinControlLight');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ControlLightAddr;
  return req;
}
Session.prototype.Set5pinControlLight = async function Set5pinControlLight(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  tem: number
): Promise<void> {
  const req = createSet5pinControlLight(addr, portAddr, scanBoardAddr, bBroadcast, tem);
  await this.connection.send(req);
};
Session.prototype.trySet5pinControlLight = async function trySet5pinControlLight(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  tem: number
): Promise<ErrorType | null> {
  const req = createSet5pinControlLight(addr, portAddr, scanBoardAddr, false, tem);
  return (await this.connection.trySend(req))?.ack ?? null;
};
