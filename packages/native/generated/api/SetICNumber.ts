import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetICNumber(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      iCNumber: number
    ): Promise<void>;
    trySetICNumber(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      iCNumber: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetICNumber<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  iCNumber: number
): Request<Broadcast> {
  const $data = encodeUIntLE(iCNumber, AddressMapping.ICNumberOccupancy);
  const req = new Request($data, bBroadcast, 'SetICNumber');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ICNumberAddr;
  return req;
}
Session.prototype.SetICNumber = async function SetICNumber(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  iCNumber: number
): Promise<void> {
  const req = createSetICNumber(addr, portAddr, scanBoardAddr, bBroadcast, iCNumber);
  await this.connection.send(req);
};
Session.prototype.trySetICNumber = async function trySetICNumber(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  iCNumber: number
): Promise<ErrorType | null> {
  const req = createSetICNumber(addr, portAddr, scanBoardAddr, false, iCNumber);
  return (await this.connection.trySend(req))?.ack ?? null;
};
