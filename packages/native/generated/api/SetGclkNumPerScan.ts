import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetGclkNumPerScan(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      gclkNumPerScan: number
    ): Promise<void>;
    trySetGclkNumPerScan(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      gclkNumPerScan: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetGclkNumPerScan<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  gclkNumPerScan: number
): Request<Broadcast> {
  const $data = encodeUIntLE(gclkNumPerScan, AddressMapping.GclkNumPerScanOccupancy);
  const req = new Request($data, bBroadcast, 'SetGclkNumPerScan');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GclkNumPerScanAddr;
  return req;
}
Session.prototype.SetGclkNumPerScan = async function SetGclkNumPerScan(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  gclkNumPerScan: number
): Promise<void> {
  const req = createSetGclkNumPerScan(addr, portAddr, scanBoardAddr, bBroadcast, gclkNumPerScan);
  await this.connection.send(req);
};
Session.prototype.trySetGclkNumPerScan = async function trySetGclkNumPerScan(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  gclkNumPerScan: number
): Promise<ErrorType | null> {
  const req = createSetGclkNumPerScan(addr, portAddr, scanBoardAddr, false, gclkNumPerScan);
  return (await this.connection.trySend(req))?.ack ?? null;
};
