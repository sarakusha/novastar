import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetReduceHighContrast(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      reduceHighData: number
    ): Promise<void>;
    trySetReduceHighContrast(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      reduceHighData: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetReduceHighContrast<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  reduceHighData: number
): Request<Broadcast> {
  const $data = encodeUIntLE(reduceHighData, AddressMapping.ReduceHighContrastOccupancy);
  const req = new Request($data, bBroadcast, 'SetReduceHighContrast');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ReduceHighContrastAddr;
  return req;
}
Session.prototype.SetReduceHighContrast = async function SetReduceHighContrast(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  reduceHighData: number
): Promise<void> {
  const req = createSetReduceHighContrast(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    reduceHighData
  );
  await this.connection.send(req);
};
Session.prototype.trySetReduceHighContrast = async function trySetReduceHighContrast(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  reduceHighData: number
): Promise<ErrorType | null> {
  const req = createSetReduceHighContrast(addr, portAddr, scanBoardAddr, false, reduceHighData);
  return (await this.connection.trySend(req))?.ack ?? null;
};
