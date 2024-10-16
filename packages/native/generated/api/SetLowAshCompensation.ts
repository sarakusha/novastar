import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetLowAshCompensation(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetLowAshCompensation(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetLowAshCompensation<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  if (data.length !== AddressMapping.LowAshCompensationOccupancy)
    throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, bBroadcast, 'SetLowAshCompensation');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LowAshCompensationAddr;
  return req;
}
Session.prototype.SetLowAshCompensation = async function SetLowAshCompensation(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createSetLowAshCompensation(addr, portAddr, scanBoardAddr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetLowAshCompensation = async function trySetLowAshCompensation(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  data: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetLowAshCompensation(addr, portAddr, scanBoardAddr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
