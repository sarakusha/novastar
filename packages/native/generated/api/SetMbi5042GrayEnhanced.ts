import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetMbi5042GrayEnhanced(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      isEnable: boolean
    ): Promise<void>;
    trySetMbi5042GrayEnhanced(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      isEnable: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetMbi5042GrayEnhanced<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  isEnable: boolean
): Request<Broadcast> {
  const req = new Request(isEnable ? [5] : [255], bBroadcast, 'SetMbi5042GrayEnhanced');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Mbi5042GrayEnhancedAddr;
  return req;
}
Session.prototype.SetMbi5042GrayEnhanced = async function SetMbi5042GrayEnhanced(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  isEnable: boolean
): Promise<void> {
  const req = createSetMbi5042GrayEnhanced(addr, portAddr, scanBoardAddr, bBroadcast, isEnable);
  await this.connection.send(req);
};
Session.prototype.trySetMbi5042GrayEnhanced = async function trySetMbi5042GrayEnhanced(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  isEnable: boolean
): Promise<ErrorType | null> {
  const req = createSetMbi5042GrayEnhanced(addr, portAddr, scanBoardAddr, false, isEnable);
  return (await this.connection.trySend(req))?.ack ?? null;
};
