import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_EnableProgramBright(
      addr: number,
      bBroadcast: boolean,
      isEnable: boolean
    ): Promise<void>;
    trySetSender_EnableProgramBright(addr: number, isEnable: boolean): Promise<ErrorType | null>;
  }
}
export default function createSetSender_EnableProgramBright<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  isEnable: boolean
): Request<Broadcast> {
  const req = new Request([isEnable ? 91 : 255], bBroadcast, 'SetSender_EnableProgramBright');
  req.destination = addr;
  req.address = AddressMapping.Sender_EnableProgramBrightAddr;
  return req;
}
Session.prototype.SetSender_EnableProgramBright = async function SetSender_EnableProgramBright(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  isEnable: boolean
): Promise<void> {
  const req = createSetSender_EnableProgramBright(addr, bBroadcast, isEnable);
  await this.connection.send(req);
};
Session.prototype.trySetSender_EnableProgramBright =
  async function trySetSender_EnableProgramBright(
    this: Session,
    addr: number,
    isEnable: boolean
  ): Promise<ErrorType | null> {
    const req = createSetSender_EnableProgramBright(addr, false, isEnable);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
