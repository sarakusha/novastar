import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_MutiChipICRamA(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      mutiChipRamA: number[] | Buffer
    ): Promise<void>;
    trySetScanner_MutiChipICRamA(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      mutiChipRamA: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_MutiChipICRamA<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  mutiChipRamA: number[] | Buffer
): Request<Broadcast> {
  if (mutiChipRamA.length !== 0) throw new TypeError(`Invalid buffer size: ${mutiChipRamA.length}`);
  const req = new Request(mutiChipRamA, bBroadcast, 'SetScanner_MutiChipICRamA');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_MutiChipICRamAAddr;
  return req;
}
Session.prototype.SetScanner_MutiChipICRamA = async function SetScanner_MutiChipICRamA(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  mutiChipRamA: number[] | Buffer
): Promise<void> {
  const req = createSetScanner_MutiChipICRamA(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    mutiChipRamA
  );
  await this.connection.send(req);
};
Session.prototype.trySetScanner_MutiChipICRamA = async function trySetScanner_MutiChipICRamA(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  mutiChipRamA: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScanner_MutiChipICRamA(addr, portAddr, scanBoardAddr, false, mutiChipRamA);
  return (await this.connection.trySend(req))?.ack ?? null;
};
