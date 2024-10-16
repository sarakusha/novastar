import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSenderVideoEnclosingMode(senderindex: number, width: number, height: number): Promise<void>;
    trySetSenderVideoEnclosingMode(
      senderindex: number,
      width: number,
      height: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSenderVideoEnclosingMode(
  senderindex: number,
  width: number,
  height: number
): Request {
  const req = new Request(
    [width % 256, width >>> 8, height % 256, height >>> 8],
    false,
    'SetSenderVideoEnclosingMode'
  );
  req.destination = senderindex;
  req.address = AddressMapping.SenderVideoEnclosingAddr;
  return req;
}
Session.prototype.SetSenderVideoEnclosingMode = async function SetSenderVideoEnclosingMode(
  this: Session,
  senderindex: number,
  width: number,
  height: number
): Promise<void> {
  const req = createSetSenderVideoEnclosingMode(senderindex, width, height);
  await this.connection.send(req);
};
Session.prototype.trySetSenderVideoEnclosingMode = async function trySetSenderVideoEnclosingMode(
  this: Session,
  senderindex: number,
  width: number,
  height: number
): Promise<ErrorType | null> {
  const req = createSetSenderVideoEnclosingMode(senderindex, width, height);
  return (await this.connection.trySend(req))?.ack ?? null;
};
