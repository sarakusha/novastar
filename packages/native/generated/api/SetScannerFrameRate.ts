import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScannerFrameRate(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      frameRate: number
    ): Promise<void>;
    trySetScannerFrameRate(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      frameRate: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScannerFrameRate<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  frameRate: number
): Request<Broadcast> {
  const $data = encodeUIntLE(frameRate, AddressMapping.DoubleModelCardSpaceRecordFreOccupancy);
  const req = new Request($data, bBroadcast, 'SetScannerFrameRate');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DoubleModelCardSpaceRecordFre;
  return req;
}
Session.prototype.SetScannerFrameRate = async function SetScannerFrameRate(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  frameRate: number
): Promise<void> {
  const req = createSetScannerFrameRate(addr, portAddr, scanBoardAddr, bBroadcast, frameRate);
  await this.connection.send(req);
};
Session.prototype.trySetScannerFrameRate = async function trySetScannerFrameRate(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  frameRate: number
): Promise<ErrorType | null> {
  const req = createSetScannerFrameRate(addr, portAddr, scanBoardAddr, false, frameRate);
  return (await this.connection.trySend(req))?.ack ?? null;
};
