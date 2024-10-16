import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetvCabinetSerialNum(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      cabinetSerialNum: number
    ): Promise<void>;
    trySetvCabinetSerialNum(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      cabinetSerialNum: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetvCabinetSerialNum<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  cabinetSerialNum: number
): Request<Broadcast> {
  const $data = encodeUIntLE(cabinetSerialNum, AddressMapping.CabinetSerialNumOccupancy);
  const req = new Request($data, bBroadcast, 'SetvCabinetSerialNum');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CabinetSerialNumAddr;
  return req;
}
Session.prototype.SetvCabinetSerialNum = async function SetvCabinetSerialNum(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  cabinetSerialNum: number
): Promise<void> {
  const req = createSetvCabinetSerialNum(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    cabinetSerialNum
  );
  await this.connection.send(req);
};
Session.prototype.trySetvCabinetSerialNum = async function trySetvCabinetSerialNum(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  cabinetSerialNum: number
): Promise<ErrorType | null> {
  const req = createSetvCabinetSerialNum(addr, portAddr, scanBoardAddr, false, cabinetSerialNum);
  return (await this.connection.trySend(req))?.ack ?? null;
};
