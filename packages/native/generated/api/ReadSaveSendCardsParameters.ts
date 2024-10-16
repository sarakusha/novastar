import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSaveSendCardsParameters(addr: number): Promise<number>;
    tryReadSaveSendCardsParameters(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSaveSendCardsParameters(addr: number): Request {
  const req = new Request(
    AddressMapping.SaveSendCardsParametersOccupancy,
    'ReadSaveSendCardsParameters'
  );
  req.destination = addr;
  req.address = AddressMapping.SaveSendCardsParametersAddr;
  return req;
}
Session.prototype.ReadSaveSendCardsParameters = async function ReadSaveSendCardsParameters(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSaveSendCardsParameters(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSaveSendCardsParameters = async function tryReadSaveSendCardsParameters(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadSaveSendCardsParameters(addr);
  return this.connection.trySend(req);
};
