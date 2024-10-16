import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SaveCoefficienceCommon(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      val: number
    ): Promise<void>;
    trySaveCoefficienceCommon(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      val: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSaveCoefficienceCommon<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  val: number
): Request<Broadcast> {
  const req = new Request([val], bBroadcast, 'SaveCoefficienceCommon');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SaveCommonCoefficienceAddr;
  return req;
}
Session.prototype.SaveCoefficienceCommon = async function SaveCoefficienceCommon(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  val: number
): Promise<void> {
  const req = createSaveCoefficienceCommon(addr, portAddr, scanBoardAddr, bBroadcast, val);
  await this.connection.send(req);
};
Session.prototype.trySaveCoefficienceCommon = async function trySaveCoefficienceCommon(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  val: number
): Promise<ErrorType | null> {
  const req = createSaveCoefficienceCommon(addr, portAddr, scanBoardAddr, false, val);
  return (await this.connection.trySend(req))?.ack ?? null;
};
