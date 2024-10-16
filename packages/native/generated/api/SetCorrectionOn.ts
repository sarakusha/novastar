import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetCorrectionOn(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      bCorrectionOn: boolean
    ): Promise<void>;
    trySetCorrectionOn(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bCorrectionOn: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetCorrectionOn<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  bCorrectionOn: boolean
): Request<Broadcast> {
  const req = new Request(bCorrectionOn ? [1] : [0], bBroadcast, 'SetCorrectionOn');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CorrectionOnAddr;
  return req;
}
Session.prototype.SetCorrectionOn = async function SetCorrectionOn(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  bCorrectionOn: boolean
): Promise<void> {
  const req = createSetCorrectionOn(addr, portAddr, scanBoardAddr, bBroadcast, bCorrectionOn);
  await this.connection.send(req);
};
Session.prototype.trySetCorrectionOn = async function trySetCorrectionOn(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bCorrectionOn: boolean
): Promise<ErrorType | null> {
  const req = createSetCorrectionOn(addr, portAddr, scanBoardAddr, false, bCorrectionOn);
  return (await this.connection.trySend(req))?.ack ?? null;
};
