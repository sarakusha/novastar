import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { ScreenDriveTypeEnum } from '../ScreenDriveType';

declare module '@novastar/codec' {
  interface API {
    SetScreenDriveType(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      driverType: ScreenDriveTypeEnum
    ): Promise<void>;
    trySetScreenDriveType(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      driverType: ScreenDriveTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScreenDriveType<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  driverType: ScreenDriveTypeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(driverType, AddressMapping.ScreenDriveTypeOccupancy);
  const req = new Request($data, bBroadcast, 'SetScreenDriveType');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScreenDriveTypeAddr;
  return req;
}
Session.prototype.SetScreenDriveType = async function SetScreenDriveType(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  driverType: ScreenDriveTypeEnum
): Promise<void> {
  const req = createSetScreenDriveType(addr, portAddr, scanBoardAddr, bBroadcast, driverType);
  await this.connection.send(req);
};
Session.prototype.trySetScreenDriveType = async function trySetScreenDriveType(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  driverType: ScreenDriveTypeEnum
): Promise<ErrorType | null> {
  const req = createSetScreenDriveType(addr, portAddr, scanBoardAddr, false, driverType);
  return (await this.connection.trySend(req))?.ack ?? null;
};
