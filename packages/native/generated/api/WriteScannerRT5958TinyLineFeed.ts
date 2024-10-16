import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    WriteScannerRT5958TinyLineFeed(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      mutiChipRamA: number[] | Buffer
    ): Promise<void>;
    tryWriteScannerRT5958TinyLineFeed(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      mutiChipRamA: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createWriteScannerRT5958TinyLineFeed<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  mutiChipRamA: number[] | Buffer
): Request<Broadcast> {
  if (mutiChipRamA.length !== 0) throw new TypeError(`Invalid buffer size: ${mutiChipRamA.length}`);
  const req = new Request(mutiChipRamA, bBroadcast, 'WriteScannerRT5958TinyLineFeed');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ReadRT5958TinyLineFeedAddr;
  return req;
}
Session.prototype.WriteScannerRT5958TinyLineFeed = async function WriteScannerRT5958TinyLineFeed(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  mutiChipRamA: number[] | Buffer
): Promise<void> {
  const req = createWriteScannerRT5958TinyLineFeed(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    mutiChipRamA
  );
  await this.connection.send(req);
};
Session.prototype.tryWriteScannerRT5958TinyLineFeed =
  async function tryWriteScannerRT5958TinyLineFeed(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    mutiChipRamA: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createWriteScannerRT5958TinyLineFeed(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      mutiChipRamA
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
