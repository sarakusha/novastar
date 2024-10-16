import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_EnableSmartBright(addr: number, dataLength: number): Promise<Buffer>;
    tryReadSender_EnableSmartBright(addr: number, dataLength: number): Promise<Packet | null>;
  }
}
export default function createReadSender_EnableSmartBright(
  addr: number,
  dataLength: number
): Request {
  const req = new Request(dataLength, 'ReadSender_EnableSmartBright');
  req.destination = addr;
  req.address = AddressMapping.Sender_EnableProgramBrightAddr;
  return req;
}
Session.prototype.ReadSender_EnableSmartBright = async function ReadSender_EnableSmartBright(
  this: Session,
  addr: number,
  dataLength: number
): Promise<Buffer> {
  const req = createReadSender_EnableSmartBright(addr, dataLength);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_EnableSmartBright = async function tryReadSender_EnableSmartBright(
  this: Session,
  addr: number,
  dataLength: number
): Promise<Packet | null> {
  const req = createReadSender_EnableSmartBright(addr, dataLength);
  return this.connection.trySend(req);
};
