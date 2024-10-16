import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetCorrectionOn_2(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number
    ): Promise<void>;
    trySetCorrectionOn_2(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetCorrectionOn_2<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number
): Request<Broadcast> {
  const req = new Request([data], bBroadcast, 'SetCorrectionOn_2');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CorrectionOnAddr;
  return req;
}
Session.prototype.SetCorrectionOn_2 = async function SetCorrectionOn_2(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  data: number
): Promise<void> {
  const req = createSetCorrectionOn_2(addr, portAddr, scanBoardAddr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetCorrectionOn_2 = async function trySetCorrectionOn_2(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  data: number
): Promise<ErrorType | null> {
  const req = createSetCorrectionOn_2(addr, portAddr, scanBoardAddr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
