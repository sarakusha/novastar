import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadScanerCountOfSenderCard(addr: number): Promise<Buffer>;
    tryReadScanerCountOfSenderCard(addr: number): Promise<Packet | null>;
  }
}
export default function createReadScanerCountOfSenderCard(addr: number): Request {
  const req = new Request(
    AddressMapping.ScanCardCountOfSenderOccupancy,
    'ReadScanerCountOfSenderCard'
  );
  req.destination = addr;
  req.address = AddressMapping.ReadScanCardCountOfSenderAddr;
  return req;
}
Session.prototype.ReadScanerCountOfSenderCard = async function ReadScanerCountOfSenderCard(
  this: Session,
  addr: number
): Promise<Buffer> {
  const req = createReadScanerCountOfSenderCard(addr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadScanerCountOfSenderCard = async function tryReadScanerCountOfSenderCard(
  this: Session,
  addr: number
): Promise<Packet | null> {
  const req = createReadScanerCountOfSenderCard(addr);
  return this.connection.trySend(req);
};
