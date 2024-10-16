import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetRefNumPerVs(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      refNumPerVs: number
    ): Promise<void>;
    trySetRefNumPerVs(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      refNumPerVs: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetRefNumPerVs<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  refNumPerVs: number
): Request<Broadcast> {
  const $data = encodeUIntLE(refNumPerVs, AddressMapping.RefNumPerVsOccupancy);
  const req = new Request($data, bBroadcast, 'SetRefNumPerVs');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.RefNumPerVsAddr;
  return req;
}
Session.prototype.SetRefNumPerVs = async function SetRefNumPerVs(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  refNumPerVs: number
): Promise<void> {
  const req = createSetRefNumPerVs(addr, portAddr, scanBoardAddr, bBroadcast, refNumPerVs);
  await this.connection.send(req);
};
Session.prototype.trySetRefNumPerVs = async function trySetRefNumPerVs(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  refNumPerVs: number
): Promise<ErrorType | null> {
  const req = createSetRefNumPerVs(addr, portAddr, scanBoardAddr, false, refNumPerVs);
  return (await this.connection.trySend(req))?.ack ?? null;
};
