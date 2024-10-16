import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_SoftwareSpace(
      addr: number,
      bBroadcast: boolean,
      sender_SoftwareSpace: number[] | Buffer,
      dataLength: number,
      addrOffset: number
    ): Promise<void>;
    trySetSender_SoftwareSpace(
      addr: number,
      sender_SoftwareSpace: number[] | Buffer,
      dataLength: number,
      addrOffset: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_SoftwareSpace<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  sender_SoftwareSpace: number[] | Buffer,
  dataLength: number,
  addrOffset: number
): Request<Broadcast> {
  if (sender_SoftwareSpace.length !== dataLength)
    throw new TypeError(`Invalid buffer size: ${sender_SoftwareSpace.length}`);
  const req = new Request(sender_SoftwareSpace, bBroadcast, 'SetSender_SoftwareSpace');
  req.destination = addr;
  req.address = AddressMapping.Sender_SoftwareSpaceAddr + addrOffset;
  return req;
}
Session.prototype.SetSender_SoftwareSpace = async function SetSender_SoftwareSpace(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  sender_SoftwareSpace: number[] | Buffer,
  dataLength: number,
  addrOffset: number
): Promise<void> {
  const req = createSetSender_SoftwareSpace(
    addr,
    bBroadcast,
    sender_SoftwareSpace,
    dataLength,
    addrOffset
  );
  await this.connection.send(req);
};
Session.prototype.trySetSender_SoftwareSpace = async function trySetSender_SoftwareSpace(
  this: Session,
  addr: number,
  sender_SoftwareSpace: number[] | Buffer,
  dataLength: number,
  addrOffset: number
): Promise<ErrorType | null> {
  const req = createSetSender_SoftwareSpace(
    addr,
    false,
    sender_SoftwareSpace,
    dataLength,
    addrOffset
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
