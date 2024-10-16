import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_ColorRestore(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      colorRestore: number[] | Buffer
    ): Promise<void>;
    trySetScanner_ColorRestore(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      colorRestore: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_ColorRestore<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  colorRestore: number[] | Buffer
): Request<Broadcast> {
  if (colorRestore.length !== AddressMapping.ColorRestoreOccupancy)
    throw new TypeError(`Invalid buffer size: ${colorRestore.length}`);
  const req = new Request(colorRestore, bBroadcast, 'SetScanner_ColorRestore');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ColorRestoreAddr;
  return req;
}
Session.prototype.SetScanner_ColorRestore = async function SetScanner_ColorRestore(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  colorRestore: number[] | Buffer
): Promise<void> {
  const req = createSetScanner_ColorRestore(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    colorRestore
  );
  await this.connection.send(req);
};
Session.prototype.trySetScanner_ColorRestore = async function trySetScanner_ColorRestore(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  colorRestore: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScanner_ColorRestore(addr, portAddr, scanBoardAddr, false, colorRestore);
  return (await this.connection.trySend(req))?.ack ?? null;
};
