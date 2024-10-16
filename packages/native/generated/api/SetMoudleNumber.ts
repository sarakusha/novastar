import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetMoudleNumber(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      MoudleNumber: number
    ): Promise<void>;
    trySetMoudleNumber(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      MoudleNumber: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetMoudleNumber<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  MoudleNumber: number
): Request<Broadcast> {
  const $data = encodeUIntLE(MoudleNumber, AddressMapping.ScannerMoudleNumberOccupancy);
  const req = new Request($data, bBroadcast, 'SetMoudleNumber');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScanneMoudleNumberAddr;
  return req;
}
Session.prototype.SetMoudleNumber = async function SetMoudleNumber(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  MoudleNumber: number
): Promise<void> {
  const req = createSetMoudleNumber(addr, portAddr, scanBoardAddr, bBroadcast, MoudleNumber);
  await this.connection.send(req);
};
Session.prototype.trySetMoudleNumber = async function trySetMoudleNumber(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  MoudleNumber: number
): Promise<ErrorType | null> {
  const req = createSetMoudleNumber(addr, portAddr, scanBoardAddr, false, MoudleNumber);
  return (await this.connection.trySend(req))?.ack ?? null;
};
