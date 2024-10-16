import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDriverType2Byte(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      driverType2Byte: number
    ): Promise<void>;
    trySetDriverType2Byte(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      driverType2Byte: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetDriverType2Byte<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  driverType2Byte: number
): Request<Broadcast> {
  const $data = encodeUIntLE(driverType2Byte, AddressMapping.DriverTypeOccupancy);
  const req = new Request($data, bBroadcast, 'SetDriverType2Byte');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DriverTypeAddr2Byte;
  return req;
}
Session.prototype.SetDriverType2Byte = async function SetDriverType2Byte(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  driverType2Byte: number
): Promise<void> {
  const req = createSetDriverType2Byte(addr, portAddr, scanBoardAddr, bBroadcast, driverType2Byte);
  await this.connection.send(req);
};
Session.prototype.trySetDriverType2Byte = async function trySetDriverType2Byte(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  driverType2Byte: number
): Promise<ErrorType | null> {
  const req = createSetDriverType2Byte(addr, portAddr, scanBoardAddr, false, driverType2Byte);
  return (await this.connection.trySend(req))?.ack ?? null;
};
