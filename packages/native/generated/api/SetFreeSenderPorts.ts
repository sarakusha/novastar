import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetFreeSenderPorts(
      senderAddr: number,
      bBroadcast: boolean,
      datas: number[] | Buffer,
      portInde: number,
      freeIndex: number
    ): Promise<void>;
    trySetFreeSenderPorts(
      senderAddr: number,
      datas: number[] | Buffer,
      portInde: number,
      freeIndex: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetFreeSenderPorts<Broadcast extends boolean>(
  senderAddr: number,
  bBroadcast: Broadcast,
  datas: number[] | Buffer,
  portInde: number,
  freeIndex: number
): Request<Broadcast> {
  const req = new Request(datas, bBroadcast, 'SetFreeSenderPorts');
  req.destination = senderAddr;
  req.address = AddressMapping.SenderPortCardsAddr + portInde * 16384 + freeIndex * 16;
  return req;
}
Session.prototype.SetFreeSenderPorts = async function SetFreeSenderPorts(
  this: Session,
  senderAddr: number,
  bBroadcast: boolean,
  datas: number[] | Buffer,
  portInde: number,
  freeIndex: number
): Promise<void> {
  const req = createSetFreeSenderPorts(senderAddr, bBroadcast, datas, portInde, freeIndex);
  await this.connection.send(req);
};
Session.prototype.trySetFreeSenderPorts = async function trySetFreeSenderPorts(
  this: Session,
  senderAddr: number,
  datas: number[] | Buffer,
  portInde: number,
  freeIndex: number
): Promise<ErrorType | null> {
  const req = createSetFreeSenderPorts(senderAddr, false, datas, portInde, freeIndex);
  return (await this.connection.trySend(req))?.ack ?? null;
};
