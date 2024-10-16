import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_HWProBrightSegemntCnt(
      addr: number,
      bBroadcast: boolean,
      segementCnt: number
    ): Promise<void>;
    trySetSender_HWProBrightSegemntCnt(
      addr: number,
      segementCnt: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_HWProBrightSegemntCnt<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  segementCnt: number
): Request<Broadcast> {
  const $data = encodeUIntLE(segementCnt, AddressMapping.Sender_BrightSegemntCntOccupancy);
  const req = new Request($data, bBroadcast, 'SetSender_HWProBrightSegemntCnt');
  req.destination = addr;
  req.address = AddressMapping.Sender_BrightSegemntCntAddr;
  return req;
}
Session.prototype.SetSender_HWProBrightSegemntCnt = async function SetSender_HWProBrightSegemntCnt(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  segementCnt: number
): Promise<void> {
  const req = createSetSender_HWProBrightSegemntCnt(addr, bBroadcast, segementCnt);
  await this.connection.send(req);
};
Session.prototype.trySetSender_HWProBrightSegemntCnt =
  async function trySetSender_HWProBrightSegemntCnt(
    this: Session,
    addr: number,
    segementCnt: number
  ): Promise<ErrorType | null> {
    const req = createSetSender_HWProBrightSegemntCnt(addr, false, segementCnt);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
