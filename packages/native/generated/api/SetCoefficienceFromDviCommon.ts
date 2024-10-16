import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetCoefficienceFromDviCommon(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean
    ): Promise<void>;
    trySetCoefficienceFromDviCommon(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetCoefficienceFromDviCommon<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast
): Request<Broadcast> {
  const req = new Request([1], bBroadcast, 'SetCoefficienceFromDviCommon');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.WriteCommonCoefficienceFromDviAddr;
  return req;
}
Session.prototype.SetCoefficienceFromDviCommon = async function SetCoefficienceFromDviCommon(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean
): Promise<void> {
  const req = createSetCoefficienceFromDviCommon(addr, portAddr, scanBoardAddr, bBroadcast);
  await this.connection.send(req);
};
Session.prototype.trySetCoefficienceFromDviCommon = async function trySetCoefficienceFromDviCommon(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<ErrorType | null> {
  const req = createSetCoefficienceFromDviCommon(addr, portAddr, scanBoardAddr, false);
  return (await this.connection.trySend(req))?.ack ?? null;
};
