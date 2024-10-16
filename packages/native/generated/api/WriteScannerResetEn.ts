import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    WriteScannerResetEn(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      isOpen: boolean,
      length: number
    ): Promise<void>;
    tryWriteScannerResetEn(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      isOpen: boolean,
      length: number
    ): Promise<ErrorType | null>;
  }
}
export default function createWriteScannerResetEn<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  isOpen: boolean,
  length: number
): Request<Broadcast> {
  const $data = encodeUIntLE(!isOpen ? 4 : 5, AddressMapping.ResetEnPointOccupancy);
  const req = new Request($data, bBroadcast, 'WriteScannerResetEn');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerResetEnAddr;
  return req;
}
Session.prototype.WriteScannerResetEn = async function WriteScannerResetEn(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  isOpen: boolean,
  length: number
): Promise<void> {
  const req = createWriteScannerResetEn(addr, portAddr, scanBoardAddr, bBroadcast, isOpen, length);
  await this.connection.send(req);
};
Session.prototype.tryWriteScannerResetEn = async function tryWriteScannerResetEn(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  isOpen: boolean,
  length: number
): Promise<ErrorType | null> {
  const req = createWriteScannerResetEn(addr, portAddr, scanBoardAddr, false, isOpen, length);
  return (await this.connection.trySend(req))?.ack ?? null;
};
