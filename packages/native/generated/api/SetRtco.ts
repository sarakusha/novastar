import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetRtco(addr: number, bBroadcast: boolean, rtco: number[] | Buffer): Promise<void>;
    trySetRtco(addr: number, rtco: number[] | Buffer): Promise<ErrorType | null>;
  }
}
export default function createSetRtco<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  rtco: number[] | Buffer
): Request<Broadcast> {
  if (rtco.length !== AddressMapping.RtcoOccupancy)
    throw new TypeError(`Invalid buffer size: ${rtco.length}`);
  const req = new Request(rtco, bBroadcast, 'SetRtco');
  req.destination = addr;
  req.address = AddressMapping.RtcoAddr;
  return req;
}
Session.prototype.SetRtco = async function SetRtco(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  rtco: number[] | Buffer
): Promise<void> {
  const req = createSetRtco(addr, bBroadcast, rtco);
  await this.connection.send(req);
};
Session.prototype.trySetRtco = async function trySetRtco(
  this: Session,
  addr: number,
  rtco: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetRtco(addr, false, rtco);
  return (await this.connection.trySend(req))?.ack ?? null;
};
