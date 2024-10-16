import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_ScreenAdjustBrightCommand(
      addr: number,
      bBoradcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetSender_ScreenAdjustBrightCommand(
      addr: number,
      data: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_ScreenAdjustBrightCommand<Broadcast extends boolean>(
  addr: number,
  bBoradcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(data, bBoradcast, 'SetSender_ScreenAdjustBrightCommand');
  req.destination = addr;
  req.address = AddressMapping.Sender_ScreenAdjustBrightAddr;
  return req;
}
Session.prototype.SetSender_ScreenAdjustBrightCommand =
  async function SetSender_ScreenAdjustBrightCommand(
    this: Session,
    addr: number,
    bBoradcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = createSetSender_ScreenAdjustBrightCommand(addr, bBoradcast, data);
    await this.connection.send(req);
  };
Session.prototype.trySetSender_ScreenAdjustBrightCommand =
  async function trySetSender_ScreenAdjustBrightCommand(
    this: Session,
    addr: number,
    data: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createSetSender_ScreenAdjustBrightCommand(addr, false, data);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
