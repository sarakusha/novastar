import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSender_HardWareBackupInfos(
      addr: number,
      bBoradcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    trySetSender_HardWareBackupInfos(
      addr: number,
      data: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSender_HardWareBackupInfos<Broadcast extends boolean>(
  addr: number,
  bBoradcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(data, bBoradcast, 'SetSender_HardWareBackupInfos');
  req.destination = addr;
  req.address = AddressMapping.Sender_HardWareBackupInfoAddr;
  return req;
}
Session.prototype.SetSender_HardWareBackupInfos = async function SetSender_HardWareBackupInfos(
  this: Session,
  addr: number,
  bBoradcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createSetSender_HardWareBackupInfos(addr, bBoradcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetSender_HardWareBackupInfos =
  async function trySetSender_HardWareBackupInfos(
    this: Session,
    addr: number,
    data: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createSetSender_HardWareBackupInfos(addr, false, data);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
