import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    WriteScannerRT5958TinyAfterglow(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      mutiChipRamA: number[] | Buffer
    ): Promise<void>;
    tryWriteScannerRT5958TinyAfterglow(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      mutiChipRamA: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createWriteScannerRT5958TinyAfterglow<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  mutiChipRamA: number[] | Buffer
): Request<Broadcast> {
  if (mutiChipRamA.length !== 0) throw new TypeError(`Invalid buffer size: ${mutiChipRamA.length}`);
  const req = new Request(mutiChipRamA, bBroadcast, 'WriteScannerRT5958TinyAfterglow');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ReadRT5958TinyAfterglowAddr;
  return req;
}
Session.prototype.WriteScannerRT5958TinyAfterglow = async function WriteScannerRT5958TinyAfterglow(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  mutiChipRamA: number[] | Buffer
): Promise<void> {
  const req = createWriteScannerRT5958TinyAfterglow(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    mutiChipRamA
  );
  await this.connection.send(req);
};
Session.prototype.tryWriteScannerRT5958TinyAfterglow =
  async function tryWriteScannerRT5958TinyAfterglow(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    mutiChipRamA: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createWriteScannerRT5958TinyAfterglow(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      mutiChipRamA
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
