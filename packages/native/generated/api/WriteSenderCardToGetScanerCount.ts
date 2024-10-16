import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    WriteSenderCardToGetScanerCount(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean
    ): Promise<void>;
    tryWriteSenderCardToGetScanerCount(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<ErrorType | null>;
  }
}
export default function createWriteSenderCardToGetScanerCount<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast
): Request<Broadcast> {
  const req = new Request([1], bBroadcast, 'WriteSenderCardToGetScanerCount');
  req.destination = addr;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScanCardCountOfSenderAddr;
  return req;
}
Session.prototype.WriteSenderCardToGetScanerCount = async function WriteSenderCardToGetScanerCount(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean
): Promise<void> {
  const req = createWriteSenderCardToGetScanerCount(addr, portAddr, scanBoardAddr, bBroadcast);
  await this.connection.send(req);
};
Session.prototype.tryWriteSenderCardToGetScanerCount =
  async function tryWriteSenderCardToGetScanerCount(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<ErrorType | null> {
    const req = createWriteSenderCardToGetScanerCount(addr, portAddr, scanBoardAddr, false);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
