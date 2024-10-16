import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_ScreenConfigFlagSpace(
      addr: number,
      bBroadcast: boolean,
      screenConfig: number[] | Buffer
    ): Promise<void>;
    trySetSender_ScreenConfigFlagSpace(
      addr: number,
      screenConfig: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_ScreenConfigFlagSpace<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  screenConfig: number[] | Buffer
): Request<Broadcast> {
  if (screenConfig.length !== AddressMapping.Sender_ScreenConfigFlagOccupancy)
    throw new TypeError(`Invalid buffer size: ${screenConfig.length}`);
  const req = new Request(screenConfig, bBroadcast, 'SetSender_ScreenConfigFlagSpace');
  req.destination = addr;
  req.address = AddressMapping.Sender_ScreenConfigFlagAddr;
  return req;
}
Session.prototype.SetSender_ScreenConfigFlagSpace = async function SetSender_ScreenConfigFlagSpace(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  screenConfig: number[] | Buffer
): Promise<void> {
  const req = createSetSender_ScreenConfigFlagSpace(addr, bBroadcast, screenConfig);
  await this.connection.send(req);
};
Session.prototype.trySetSender_ScreenConfigFlagSpace =
  async function trySetSender_ScreenConfigFlagSpace(
    this: Session,
    addr: number,
    screenConfig: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createSetSender_ScreenConfigFlagSpace(addr, false, screenConfig);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
