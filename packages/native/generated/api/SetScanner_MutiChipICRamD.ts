import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_MutiChipICRamD(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      mutiChipRamD: number[] | Buffer
    ): Promise<void>;
    trySetScanner_MutiChipICRamD(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      mutiChipRamD: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_MutiChipICRamD<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  mutiChipRamD: number[] | Buffer
): Request<Broadcast> {
  if (mutiChipRamD.length !== 0) throw new TypeError(`Invalid buffer size: ${mutiChipRamD.length}`);
  const req = new Request(mutiChipRamD, bBroadcast, 'SetScanner_MutiChipICRamD');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_MutiChipICRamDAddr;
  return req;
}
Session.prototype.SetScanner_MutiChipICRamD = async function SetScanner_MutiChipICRamD(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  mutiChipRamD: number[] | Buffer
): Promise<void> {
  const req = createSetScanner_MutiChipICRamD(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    mutiChipRamD
  );
  await this.connection.send(req);
};
Session.prototype.trySetScanner_MutiChipICRamD = async function trySetScanner_MutiChipICRamD(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  mutiChipRamD: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScanner_MutiChipICRamD(addr, portAddr, scanBoardAddr, false, mutiChipRamD);
  return (await this.connection.trySend(req))?.ack ?? null;
};
