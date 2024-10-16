import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetXbitGammaMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number
    ): Promise<void>;
    trySetXbitGammaMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetXbitGammaMode<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number
): Request<Broadcast> {
  const req = new Request([data], bBroadcast, 'SetXbitGammaMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.XbitGammaModeAddr;
  return req;
}
Session.prototype.SetXbitGammaMode = async function SetXbitGammaMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  data: number
): Promise<void> {
  const req = createSetXbitGammaMode(addr, portAddr, scanBoardAddr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetXbitGammaMode = async function trySetXbitGammaMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  data: number
): Promise<ErrorType | null> {
  const req = createSetXbitGammaMode(addr, portAddr, scanBoardAddr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
