import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetTemprature(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      tem: number
    ): Promise<void>;
    trySetTemprature(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      tem: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetTemprature<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  tem: number
): Request<Broadcast> {
  const $data = encodeUIntLE(tem, AddressMapping.TempratureOccupancy);
  const req = new Request($data, bBroadcast, 'SetTemprature');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.TempratureAddr;
  return req;
}
Session.prototype.SetTemprature = async function SetTemprature(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  tem: number
): Promise<void> {
  const req = createSetTemprature(addr, portAddr, scanBoardAddr, bBroadcast, tem);
  await this.connection.send(req);
};
Session.prototype.trySetTemprature = async function trySetTemprature(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  tem: number
): Promise<ErrorType | null> {
  const req = createSetTemprature(addr, portAddr, scanBoardAddr, false, tem);
  return (await this.connection.trySend(req))?.ack ?? null;
};
