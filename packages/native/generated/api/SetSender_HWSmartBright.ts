import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_HWSmartBright(
      addr: number,
      bBoradcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetSender_HWSmartBright(addr: number, data: number[] | Buffer): Promise<ErrorType | null>;
  }
}
export default function createSetSender_HWSmartBright<Broadcast extends boolean>(
  addr: number,
  bBoradcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(data, bBoradcast, 'SetSender_HWSmartBright');
  req.destination = addr;
  req.address = AddressMapping.Sender_EnableProgramBrightAddr;
  return req;
}
Session.prototype.SetSender_HWSmartBright = async function SetSender_HWSmartBright(
  this: Session,
  addr: number,
  bBoradcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createSetSender_HWSmartBright(addr, bBoradcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetSender_HWSmartBright = async function trySetSender_HWSmartBright(
  this: Session,
  addr: number,
  data: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetSender_HWSmartBright(addr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
