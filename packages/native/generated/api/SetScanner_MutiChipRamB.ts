import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_MutiChipRamB(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      mutiChipRamB: number[] | Buffer
    ): Promise<void>;
    trySetScanner_MutiChipRamB(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      mutiChipRamB: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_MutiChipRamB<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  mutiChipRamB: number[] | Buffer
): Request<Broadcast> {
  if (mutiChipRamB.length !== 0) throw new TypeError(`Invalid buffer size: ${mutiChipRamB.length}`);
  const req = new Request(mutiChipRamB, bBroadcast, 'SetScanner_MutiChipRamB');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_MutiChipRamBAddr;
  return req;
}
Session.prototype.SetScanner_MutiChipRamB = async function SetScanner_MutiChipRamB(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  mutiChipRamB: number[] | Buffer
): Promise<void> {
  const req = createSetScanner_MutiChipRamB(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    mutiChipRamB
  );
  await this.connection.send(req);
};
Session.prototype.trySetScanner_MutiChipRamB = async function trySetScanner_MutiChipRamB(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  mutiChipRamB: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScanner_MutiChipRamB(addr, portAddr, scanBoardAddr, false, mutiChipRamB);
  return (await this.connection.trySend(req))?.ack ?? null;
};
