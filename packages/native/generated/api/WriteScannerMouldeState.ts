import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    WriteScannerMouldeState(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      mutiChipRamA: number[] | Buffer
    ): Promise<void>;
    tryWriteScannerMouldeState(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      mutiChipRamA: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createWriteScannerMouldeState<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  mutiChipRamA: number[] | Buffer
): Request<Broadcast> {
  if (mutiChipRamA.length !== 0) throw new TypeError(`Invalid buffer size: ${mutiChipRamA.length}`);
  const req = new Request(mutiChipRamA, bBroadcast, 'WriteScannerMouldeState');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SUM6060WriteMouldeStateAddr;
  return req;
}
Session.prototype.WriteScannerMouldeState = async function WriteScannerMouldeState(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  mutiChipRamA: number[] | Buffer
): Promise<void> {
  const req = createWriteScannerMouldeState(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    mutiChipRamA
  );
  await this.connection.send(req);
};
Session.prototype.tryWriteScannerMouldeState = async function tryWriteScannerMouldeState(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  mutiChipRamA: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createWriteScannerMouldeState(addr, portAddr, scanBoardAddr, false, mutiChipRamA);
  return (await this.connection.trySend(req))?.ack ?? null;
};
