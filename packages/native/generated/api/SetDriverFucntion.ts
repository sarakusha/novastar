import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDriverFucntion(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      driverFunc: number
    ): Promise<void>;
    trySetDriverFucntion(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      driverFunc: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetDriverFucntion<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  driverFunc: number
): Request<Broadcast> {
  const $data = encodeUIntLE(driverFunc, AddressMapping.DriverFucntionOccupancy);
  const req = new Request($data, bBroadcast, 'SetDriverFucntion');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DriverFucntionAddr;
  return req;
}
Session.prototype.SetDriverFucntion = async function SetDriverFucntion(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  driverFunc: number
): Promise<void> {
  const req = createSetDriverFucntion(addr, portAddr, scanBoardAddr, bBroadcast, driverFunc);
  await this.connection.send(req);
};
Session.prototype.trySetDriverFucntion = async function trySetDriverFucntion(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  driverFunc: number
): Promise<ErrorType | null> {
  const req = createSetDriverFucntion(addr, portAddr, scanBoardAddr, false, driverFunc);
  return (await this.connection.trySend(req))?.ack ?? null;
};
