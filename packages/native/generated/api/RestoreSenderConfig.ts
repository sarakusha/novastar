import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    RestoreSenderConfig(
      addr: number,
      bBroadcast: boolean,
      writeData: number[] | Buffer
    ): Promise<void>;
    tryRestoreSenderConfig(addr: number, writeData: number[] | Buffer): Promise<ErrorType | null>;
  }
}
export default function createRestoreSenderConfig<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  writeData: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(writeData, bBroadcast, 'RestoreSenderConfig');
  req.destination = addr;
  req.address = AddressMapping.BackUpFileAddr;
  return req;
}
Session.prototype.RestoreSenderConfig = async function RestoreSenderConfig(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  writeData: number[] | Buffer
): Promise<void> {
  const req = createRestoreSenderConfig(addr, bBroadcast, writeData);
  await this.connection.send(req);
};
Session.prototype.tryRestoreSenderConfig = async function tryRestoreSenderConfig(
  this: Session,
  addr: number,
  writeData: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createRestoreSenderConfig(addr, false, writeData);
  return (await this.connection.trySend(req))?.ack ?? null;
};
