import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_MutiChipRamD(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      mutiChipRamD: number[] | Buffer
    ): Promise<void>;
    trySetScanner_MutiChipRamD(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      mutiChipRamD: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_MutiChipRamD<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  mutiChipRamD: number[] | Buffer
): Request<Broadcast> {
  if (mutiChipRamD.length !== 0) throw new TypeError(`Invalid buffer size: ${mutiChipRamD.length}`);
  const req = new Request(mutiChipRamD, bBroadcast, 'SetScanner_MutiChipRamD');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_MutiChipRamDAddr;
  return req;
}
Session.prototype.SetScanner_MutiChipRamD = async function SetScanner_MutiChipRamD(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  mutiChipRamD: number[] | Buffer
): Promise<void> {
  const req = createSetScanner_MutiChipRamD(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    mutiChipRamD
  );
  await this.connection.send(req);
};
Session.prototype.trySetScanner_MutiChipRamD = async function trySetScanner_MutiChipRamD(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  mutiChipRamD: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScanner_MutiChipRamD(addr, portAddr, scanBoardAddr, false, mutiChipRamD);
  return (await this.connection.trySend(req))?.ack ?? null;
};
