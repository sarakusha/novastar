import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetCorrectionOnEx(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      bCorrectionOn: boolean
    ): Promise<void>;
    trySetCorrectionOnEx(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bCorrectionOn: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetCorrectionOnEx<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  bCorrectionOn: boolean
): Request<Broadcast> {
  const req = new Request(bCorrectionOn ? [5] : [0], bBroadcast, 'SetCorrectionOnEx');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CorrectionOnExAddr;
  return req;
}
Session.prototype.SetCorrectionOnEx = async function SetCorrectionOnEx(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  bCorrectionOn: boolean
): Promise<void> {
  const req = createSetCorrectionOnEx(addr, portAddr, scanBoardAddr, bBroadcast, bCorrectionOn);
  await this.connection.send(req);
};
Session.prototype.trySetCorrectionOnEx = async function trySetCorrectionOnEx(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bCorrectionOn: boolean
): Promise<ErrorType | null> {
  const req = createSetCorrectionOnEx(addr, portAddr, scanBoardAddr, false, bCorrectionOn);
  return (await this.connection.trySend(req))?.ack ?? null;
};
