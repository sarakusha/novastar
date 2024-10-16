import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    WriteBackUpFileHeader(
      addr: number,
      bBroadcast: boolean,
      writeData: number[] | Buffer
    ): Promise<void>;
    tryWriteBackUpFileHeader(addr: number, writeData: number[] | Buffer): Promise<ErrorType | null>;
  }
}
export default function createWriteBackUpFileHeader<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  writeData: number[] | Buffer
): Request<Broadcast> {
  if (writeData.length !== AddressMapping.BackUpFileHeaderAddrOccupancy)
    throw new TypeError(`Invalid buffer size: ${writeData.length}`);
  const req = new Request(writeData, bBroadcast, 'WriteBackUpFileHeader');
  req.destination = addr;
  req.address = AddressMapping.BackUpFileHeaderAddr;
  return req;
}
Session.prototype.WriteBackUpFileHeader = async function WriteBackUpFileHeader(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  writeData: number[] | Buffer
): Promise<void> {
  const req = createWriteBackUpFileHeader(addr, bBroadcast, writeData);
  await this.connection.send(req);
};
Session.prototype.tryWriteBackUpFileHeader = async function tryWriteBackUpFileHeader(
  this: Session,
  addr: number,
  writeData: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createWriteBackUpFileHeader(addr, false, writeData);
  return (await this.connection.trySend(req))?.ack ?? null;
};
