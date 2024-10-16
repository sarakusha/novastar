import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender_HardWareBackupInfos(addr: number, dataLength: number): Promise<Buffer>;
    tryReadSender_HardWareBackupInfos(addr: number, dataLength: number): Promise<Packet | null>;
  }
}
export default function createReadSender_HardWareBackupInfos(
  addr: number,
  dataLength: number
): Request {
  const req = new Request(dataLength, 'ReadSender_HardWareBackupInfos');
  req.destination = addr;
  req.address = AddressMapping.Sender_HardWareBackupInfoAddr;
  return req;
}
Session.prototype.ReadSender_HardWareBackupInfos = async function ReadSender_HardWareBackupInfos(
  this: Session,
  addr: number,
  dataLength: number
): Promise<Buffer> {
  const req = createReadSender_HardWareBackupInfos(addr, dataLength);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender_HardWareBackupInfos =
  async function tryReadSender_HardWareBackupInfos(
    this: Session,
    addr: number,
    dataLength: number
  ): Promise<Packet | null> {
    const req = createReadSender_HardWareBackupInfos(addr, dataLength);
    return this.connection.trySend(req);
  };
