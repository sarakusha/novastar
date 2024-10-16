import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { ChipTypeEnum } from '../ChipType';

declare module '@novastar/codec' {
  interface API {
    SetDriverType(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      driverType: ChipTypeEnum
    ): Promise<void>;
    trySetDriverType(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      driverType: ChipTypeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetDriverType<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  driverType: ChipTypeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(driverType, AddressMapping.DriverTypeOccupancy);
  const req = new Request($data, bBroadcast, 'SetDriverType');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DriverTypeAddr;
  return req;
}
Session.prototype.SetDriverType = async function SetDriverType(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  driverType: ChipTypeEnum
): Promise<void> {
  const req = createSetDriverType(addr, portAddr, scanBoardAddr, bBroadcast, driverType);
  await this.connection.send(req);
};
Session.prototype.trySetDriverType = async function trySetDriverType(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  driverType: ChipTypeEnum
): Promise<ErrorType | null> {
  const req = createSetDriverType(addr, portAddr, scanBoardAddr, false, driverType);
  return (await this.connection.trySend(req))?.ack ?? null;
};
