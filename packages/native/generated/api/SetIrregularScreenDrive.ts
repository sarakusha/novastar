import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetIrregularScreenDrive(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      isIrregularScreenDrive: boolean
    ): Promise<void>;
    trySetIrregularScreenDrive(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      isIrregularScreenDrive: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetIrregularScreenDrive<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  isIrregularScreenDrive: boolean
): Request<Broadcast> {
  const req = new Request(
    isIrregularScreenDrive ? [1] : [0],
    bBroadcast,
    'SetIrregularScreenDrive'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.IrregularScreenDriveAddr;
  return req;
}
Session.prototype.SetIrregularScreenDrive = async function SetIrregularScreenDrive(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  isIrregularScreenDrive: boolean
): Promise<void> {
  const req = createSetIrregularScreenDrive(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    isIrregularScreenDrive
  );
  await this.connection.send(req);
};
Session.prototype.trySetIrregularScreenDrive = async function trySetIrregularScreenDrive(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  isIrregularScreenDrive: boolean
): Promise<ErrorType | null> {
  const req = createSetIrregularScreenDrive(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    isIrregularScreenDrive
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
