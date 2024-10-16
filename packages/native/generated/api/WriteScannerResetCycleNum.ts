import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    WriteScannerResetCycleNum(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      cycleNum: number,
      length: number
    ): Promise<void>;
    tryWriteScannerResetCycleNum(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      cycleNum: number,
      length: number
    ): Promise<ErrorType | null>;
  }
}
export default function createWriteScannerResetCycleNum<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  cycleNum: number,
  length: number
): Request<Broadcast> {
  const $data = encodeUIntLE(cycleNum, AddressMapping.ResetCycleNumPointOccupancy);
  const req = new Request($data, bBroadcast, 'WriteScannerResetCycleNum');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerResetCycleNumAddr;
  return req;
}
Session.prototype.WriteScannerResetCycleNum = async function WriteScannerResetCycleNum(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  cycleNum: number,
  length: number
): Promise<void> {
  const req = createWriteScannerResetCycleNum(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    cycleNum,
    length
  );
  await this.connection.send(req);
};
Session.prototype.tryWriteScannerResetCycleNum = async function tryWriteScannerResetCycleNum(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  cycleNum: number,
  length: number
): Promise<ErrorType | null> {
  const req = createWriteScannerResetCycleNum(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    cycleNum,
    length
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
