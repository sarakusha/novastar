import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSaveDistributeParameters(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      bBroadcast: boolean,
      saveSendCardsParameters: number
    ): Promise<void>;
    trySetSaveDistributeParameters(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      saveSendCardsParameters: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSaveDistributeParameters<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  distributeAddr: number,
  bBroadcast: Broadcast,
  saveSendCardsParameters: number
): Request<Broadcast> {
  const req = new Request([saveSendCardsParameters], bBroadcast, 'SetSaveDistributeParameters');
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.SaveDistributeParameterAddr;
  return req;
}
Session.prototype.SetSaveDistributeParameters = async function SetSaveDistributeParameters(
  this: Session,
  addr: number,
  portAddr: number,
  distributeAddr: number,
  bBroadcast: boolean,
  saveSendCardsParameters: number
): Promise<void> {
  const req = createSetSaveDistributeParameters(
    addr,
    portAddr,
    distributeAddr,
    bBroadcast,
    saveSendCardsParameters
  );
  await this.connection.send(req);
};
Session.prototype.trySetSaveDistributeParameters = async function trySetSaveDistributeParameters(
  this: Session,
  addr: number,
  portAddr: number,
  distributeAddr: number,
  saveSendCardsParameters: number
): Promise<ErrorType | null> {
  const req = createSetSaveDistributeParameters(
    addr,
    portAddr,
    distributeAddr,
    false,
    saveSendCardsParameters
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
