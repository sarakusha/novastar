import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetLowGrayCompensation(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      lowGrayCpt: number
    ): Promise<void>;
    trySetLowGrayCompensation(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      lowGrayCpt: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetLowGrayCompensation<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  lowGrayCpt: number
): Request<Broadcast> {
  const $data = encodeUIntLE(lowGrayCpt, AddressMapping.LowGrayCompensationOccupancy);
  const req = new Request($data, bBroadcast, 'SetLowGrayCompensation');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LowGrayCompensationAddr;
  return req;
}
Session.prototype.SetLowGrayCompensation = async function SetLowGrayCompensation(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  lowGrayCpt: number
): Promise<void> {
  const req = createSetLowGrayCompensation(addr, portAddr, scanBoardAddr, bBroadcast, lowGrayCpt);
  await this.connection.send(req);
};
Session.prototype.trySetLowGrayCompensation = async function trySetLowGrayCompensation(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  lowGrayCpt: number
): Promise<ErrorType | null> {
  const req = createSetLowGrayCompensation(addr, portAddr, scanBoardAddr, false, lowGrayCpt);
  return (await this.connection.trySend(req))?.ack ?? null;
};
