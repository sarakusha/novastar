import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_EnableProgramBright(addr: number): Promise<number>;
    tryReadSender_EnableProgramBright(addr: number): Promise<Packet | null>;
  }
}
export default function createReadSender_EnableProgramBright(addr: number): Request {
  const req = new Request(
    AddressMapping.Sender_EnableProgramBrightOccupancy,
    'ReadSender_EnableProgramBright'
  );
  req.destination = addr;
  req.address = AddressMapping.Sender_EnableProgramBrightAddr;
  return req;
}
Session.prototype.ReadSender_EnableProgramBright = async function ReadSender_EnableProgramBright(
  this: Session,
  addr: number
): Promise<number> {
  const req = createReadSender_EnableProgramBright(addr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSender_EnableProgramBright =
  async function tryReadSender_EnableProgramBright(
    this: Session,
    addr: number
  ): Promise<Packet | null> {
    const req = createReadSender_EnableProgramBright(addr);
    return this.connection.trySend(req);
  };
