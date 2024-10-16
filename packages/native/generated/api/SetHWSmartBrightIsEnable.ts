import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetHWSmartBrightIsEnable(addr: number, bBoradcast: boolean, isEnable: boolean): Promise<void>;
    trySetHWSmartBrightIsEnable(addr: number, isEnable: boolean): Promise<ErrorType | null>;
  }
}
export default function createSetHWSmartBrightIsEnable<Broadcast extends boolean>(
  addr: number,
  bBoradcast: Broadcast,
  isEnable: boolean
): Request<Broadcast> {
  const req = new Request(isEnable ? [1] : [0], bBoradcast, 'SetHWSmartBrightIsEnable');
  req.destination = addr;
  req.address = AddressMapping.Sender_EnableProgramBrightAddr + 12;
  return req;
}
Session.prototype.SetHWSmartBrightIsEnable = async function SetHWSmartBrightIsEnable(
  this: Session,
  addr: number,
  bBoradcast: boolean,
  isEnable: boolean
): Promise<void> {
  const req = createSetHWSmartBrightIsEnable(addr, bBoradcast, isEnable);
  await this.connection.send(req);
};
Session.prototype.trySetHWSmartBrightIsEnable = async function trySetHWSmartBrightIsEnable(
  this: Session,
  addr: number,
  isEnable: boolean
): Promise<ErrorType | null> {
  const req = createSetHWSmartBrightIsEnable(addr, false, isEnable);
  return (await this.connection.trySend(req))?.ack ?? null;
};
