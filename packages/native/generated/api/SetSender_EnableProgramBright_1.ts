import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_EnableProgramBright_1(addr: number, bBroadcast: boolean, data: number): Promise<void>;
    trySetSender_EnableProgramBright_1(addr: number, data: number): Promise<ErrorType | null>;
  }
}
export default function createSetSender_EnableProgramBright_1<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  data: number
): Request<Broadcast> {
  const req = new Request([data], bBroadcast, 'SetSender_EnableProgramBright_1');
  req.destination = addr;
  req.address = AddressMapping.Sender_EnableProgramBrightAddr;
  return req;
}
Session.prototype.SetSender_EnableProgramBright_1 = async function SetSender_EnableProgramBright_1(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  data: number
): Promise<void> {
  const req = createSetSender_EnableProgramBright_1(addr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetSender_EnableProgramBright_1 =
  async function trySetSender_EnableProgramBright_1(
    this: Session,
    addr: number,
    data: number
  ): Promise<ErrorType | null> {
    const req = createSetSender_EnableProgramBright_1(addr, false, data);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
