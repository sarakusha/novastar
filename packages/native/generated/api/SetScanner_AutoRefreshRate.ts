import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_AutoRefreshRate(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      autoRefreshRateData: number[] | Buffer
    ): Promise<void>;
    trySetScanner_AutoRefreshRate(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      autoRefreshRateData: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_AutoRefreshRate<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  autoRefreshRateData: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(autoRefreshRateData, bBroadcast, 'SetScanner_AutoRefreshRate');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.AutoRefreshRateAddr;
  return req;
}
Session.prototype.SetScanner_AutoRefreshRate = async function SetScanner_AutoRefreshRate(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  autoRefreshRateData: number[] | Buffer
): Promise<void> {
  const req = createSetScanner_AutoRefreshRate(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    autoRefreshRateData
  );
  await this.connection.send(req);
};
Session.prototype.trySetScanner_AutoRefreshRate = async function trySetScanner_AutoRefreshRate(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  autoRefreshRateData: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScanner_AutoRefreshRate(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    autoRefreshRateData
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
