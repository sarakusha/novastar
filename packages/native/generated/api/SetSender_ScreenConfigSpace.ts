import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_ScreenConfigSpace(
      addr: number,
      bBroadcast: boolean,
      screenConfig: number[] | Buffer
    ): Promise<void>;
    trySetSender_ScreenConfigSpace(
      addr: number,
      screenConfig: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_ScreenConfigSpace<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  screenConfig: number[] | Buffer
): Request<Broadcast> {
  if (screenConfig.length !== AddressMapping.Sender_ScreenConfigSpaceOccupancy)
    throw new TypeError(`Invalid buffer size: ${screenConfig.length}`);
  const req = new Request(screenConfig, bBroadcast, 'SetSender_ScreenConfigSpace');
  req.destination = addr;
  req.address = AddressMapping.Sender_ScreenConfigSpaceAddr;
  return req;
}
Session.prototype.SetSender_ScreenConfigSpace = async function SetSender_ScreenConfigSpace(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  screenConfig: number[] | Buffer
): Promise<void> {
  const req = createSetSender_ScreenConfigSpace(addr, bBroadcast, screenConfig);
  await this.connection.send(req);
};
Session.prototype.trySetSender_ScreenConfigSpace = async function trySetSender_ScreenConfigSpace(
  this: Session,
  addr: number,
  screenConfig: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSender_ScreenConfigSpace(addr, false, screenConfig);
  return (await this.connection.trySend(req))?.ack ?? null;
};
