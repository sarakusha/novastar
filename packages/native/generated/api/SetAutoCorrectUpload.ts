import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetAutoCorrectUpload(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      AutoCorrect: boolean
    ): Promise<void>;
    trySetAutoCorrectUpload(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      AutoCorrect: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetAutoCorrectUpload<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  AutoCorrect: boolean
): Request<Broadcast> {
  const req = new Request(AutoCorrect ? [85] : [5], bBroadcast, 'SetAutoCorrectUpload');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.AutoCorrectUploadAddr;
  return req;
}
Session.prototype.SetAutoCorrectUpload = async function SetAutoCorrectUpload(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  AutoCorrect: boolean
): Promise<void> {
  const req = createSetAutoCorrectUpload(addr, portAddr, scanBoardAddr, bBroadcast, AutoCorrect);
  await this.connection.send(req);
};
Session.prototype.trySetAutoCorrectUpload = async function trySetAutoCorrectUpload(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  AutoCorrect: boolean
): Promise<ErrorType | null> {
  const req = createSetAutoCorrectUpload(addr, portAddr, scanBoardAddr, false, AutoCorrect);
  return (await this.connection.trySend(req))?.ack ?? null;
};
