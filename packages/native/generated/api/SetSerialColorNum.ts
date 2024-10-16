import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSerialColorNum(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      serialColorNum: number
    ): Promise<void>;
    trySetSerialColorNum(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      serialColorNum: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSerialColorNum<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  serialColorNum: number
): Request<Broadcast> {
  const $data = encodeUIntLE(serialColorNum, AddressMapping.SerialColorNumOccupancy);
  const req = new Request($data, bBroadcast, 'SetSerialColorNum');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SerialColorNumAddr;
  return req;
}
Session.prototype.SetSerialColorNum = async function SetSerialColorNum(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  serialColorNum: number
): Promise<void> {
  const req = createSetSerialColorNum(addr, portAddr, scanBoardAddr, bBroadcast, serialColorNum);
  await this.connection.send(req);
};
Session.prototype.trySetSerialColorNum = async function trySetSerialColorNum(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  serialColorNum: number
): Promise<ErrorType | null> {
  const req = createSetSerialColorNum(addr, portAddr, scanBoardAddr, false, serialColorNum);
  return (await this.connection.trySend(req))?.ack ?? null;
};
