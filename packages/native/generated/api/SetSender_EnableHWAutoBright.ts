import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_EnableHWAutoBright(
      addr: number,
      bBroadcast: boolean,
      enableAutoData: boolean
    ): Promise<void>;
    trySetSender_EnableHWAutoBright(
      addr: number,
      enableAutoData: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_EnableHWAutoBright<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  enableAutoData: boolean
): Request<Broadcast> {
  const req = new Request(
    enableAutoData ? [125] : [255],
    bBroadcast,
    'SetSender_EnableHWAutoBright'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_EnableHWAutoBrightAddr;
  return req;
}
Session.prototype.SetSender_EnableHWAutoBright = async function SetSender_EnableHWAutoBright(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  enableAutoData: boolean
): Promise<void> {
  const req = createSetSender_EnableHWAutoBright(addr, bBroadcast, enableAutoData);
  await this.connection.send(req);
};
Session.prototype.trySetSender_EnableHWAutoBright = async function trySetSender_EnableHWAutoBright(
  this: Session,
  addr: number,
  enableAutoData: boolean
): Promise<ErrorType | null> {
  const req = createSetSender_EnableHWAutoBright(addr, false, enableAutoData);
  return (await this.connection.trySend(req))?.ack ?? null;
};
