import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSaveSendCardsParameters(
      addr: number,
      bBroadcast: boolean,
      saveSendCardsParameters: number
    ): Promise<void>;
    trySetSaveSendCardsParameters(
      addr: number,
      saveSendCardsParameters: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSaveSendCardsParameters<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  saveSendCardsParameters: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    saveSendCardsParameters,
    AddressMapping.SaveSendCardsParametersOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetSaveSendCardsParameters');
  req.destination = addr;
  req.address = AddressMapping.SaveSendCardsParametersAddr;
  return req;
}
Session.prototype.SetSaveSendCardsParameters = async function SetSaveSendCardsParameters(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  saveSendCardsParameters: number
): Promise<void> {
  const req = createSetSaveSendCardsParameters(addr, bBroadcast, saveSendCardsParameters);
  await this.connection.send(req);
};
Session.prototype.trySetSaveSendCardsParameters = async function trySetSaveSendCardsParameters(
  this: Session,
  addr: number,
  saveSendCardsParameters: number
): Promise<ErrorType | null> {
  const req = createSetSaveSendCardsParameters(addr, false, saveSendCardsParameters);
  return (await this.connection.trySend(req))?.ack ?? null;
};
